// IndexedDB owns the growing study logs. Individual answers and the current session
// commit together. Typing a draft touches only the single session record.
(function (root) {
  "use strict";
  const NAME = "competition-math-study", ATTEMPTS = "arenaAttempts", SESSION = "arenaSession", ACTIVITY = "activity";
  const ALL = [ATTEMPTS, SESSION, ACTIVITY];
  let connection, preparing;
  let channel;
  try { if (root.BroadcastChannel) channel = new root.BroadcastChannel(NAME); } catch {}
  function changed(kind) {
    try {
      if (channel) channel.postMessage(kind);
      else root.localStorage.setItem("mq-study-change", JSON.stringify([kind, Date.now(), Math.random()]));
    } catch {} // The transaction already committed if cross-tab notifications are unavailable.
  }
  function subscribe(listener) {
    if (channel) channel.addEventListener("message", e => listener(e.data));
    else root.addEventListener("storage", e => {
      if (e.key === "mq-study-change" && e.newValue) listener(JSON.parse(e.newValue)[0]);
    });
  }
  const request = req => new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  function transaction(db, names, mode, work) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(names, mode);
      let result, failure;
      tx.oncomplete = () => resolve(result);
      tx.onabort = () => reject(failure || tx.error || Error("Study storage transaction was interrupted."));
      Promise.resolve().then(() => work(tx)).then(value => { result = value; }, err => {
        failure = err;
        try { tx.abort(); } catch { reject(err); }
      });
    });
  }
  async function arenaIn(tx) {
    const [events, session] = await Promise.all([request(tx.objectStore(ATTEMPTS).getAll()), request(tx.objectStore(SESSION).get("current"))]);
    events.sort((a, b) => a.at - b.at || a.identity.localeCompare(b.identity));
    return {version: 1, events, session: session || null};
  }
  function importInto(db, arena, activity) {
    return transaction(db, ALL, "readwrite", async tx => {
      if (arena != null) {
        const merged = root.Arena.merge(await arenaIn(tx), arena);
        const entries = tx.objectStore(ATTEMPTS);
        entries.clear();
        for (const event of merged.events) entries.put(event);
        tx.objectStore(SESSION).put(merged.session, "current");
      }
      if (activity != null) {
        if (activity.version !== 1 || !Array.isArray(activity.events)) throw Error("Invalid study activity backup.");
        const events = root.LearningActivity.merge(null, activity).events;
        if (events.length !== new Set(activity.events.map(e => e?.id)).size) throw Error("Invalid study activity record.");
        for (const event of events) tx.objectStore(ACTIVITY).put(event);
      }
    });
  }
  function open() {
    if (connection) return connection;
    connection = new Promise((resolve, reject) => {
      const req = root.indexedDB.open(NAME, 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore(ATTEMPTS, {keyPath: "identity"});
        req.result.createObjectStore(SESSION);
        req.result.createObjectStore(ACTIVITY, {keyPath: "id"}).createIndex("kind", "kind");
      };
      req.onerror = () => reject(req.error);
      req.onsuccess = () => {
        const db = req.result;
        db.onversionchange = () => { db.close(); connection = null; preparing = null; };
        resolve(db);
      };
    }).catch(error => { connection = null; throw error; });
    return connection;
  }
  async function prepare() {
    const db = await open();
    const keys = [root.Arena?.KEY, root.LearningActivity.KEY].filter(Boolean);
    const legacy = new Map(keys.map(key => [key, root.localStorage.getItem(key)]).filter(([, raw]) => raw !== null));
    if (legacy.size) {
      await importInto(db, JSON.parse(legacy.get(root.Arena?.KEY) || "null"),
        JSON.parse(legacy.get(root.LearningActivity.KEY) || "null"));
      for (const [key, raw] of legacy) if (root.localStorage.getItem(key) === raw) root.localStorage.removeItem(key);
    }
    return db;
  }
  function ready() {
    return preparing ||= prepare().catch(error => { preparing = null; throw error; });
  }
  async function snapshot() {
    return transaction(await ready(), ALL, "readonly", async tx => {
      const [arena, events] = await Promise.all([arenaIn(tx), request(tx.objectStore(ACTIVITY).getAll())]);
      return { arena, activity: {version: 1, events} };
    });
  }
  async function changeArena(update) {
    let written = false;
    const state = await transaction(await ready(), [ATTEMPTS, SESSION], "readwrite", async tx => {
      const state = await arenaIn(tx), oldCount = state.events.length;
      if (update(state) === false) return state;
      written = true;
      for (const event of state.events.slice(oldCount)) tx.objectStore(ATTEMPTS).add(event);
      if (state.session) state.session.updated = Math.max(Date.now(), state.session.updated + 1);
      tx.objectStore(SESSION).put(state.session, "current");
      return state;
    });
    if (written) changed("arena");
    return state;
  }
  async function saveDraft(id, slug, draft) {
    const wrote = await transaction(await ready(), [SESSION], "readwrite", async tx => {
      const store = tx.objectStore(SESSION), s = await request(store.get("current"));
      if (s?.id !== id || s.closed || s.slot?.slug !== slug || s.slot.draft === draft) return false;
      s.slot.draft = draft;
      s.updated = Math.max(Date.now(), s.updated + 1);
      store.put(s, "current");
      return true;
    });
    if (wrote) changed("draft");
  }
  async function appendActivity(event) {
    await transaction(await ready(), [ACTIVITY], "readwrite", tx => { tx.objectStore(ACTIVITY).put(event); });
  }
  async function restore(arena, activity) {
    await importInto(await ready(), arena, activity);
    changed("arena");
  }
  root.StudyStorage = { enabled: !!root.indexedDB, subscribe, snapshot, changeArena, saveDraft, appendActivity, restore,
    async readArena() { return transaction(await ready(), [ATTEMPTS, SESSION], "readonly", arenaIn); },
    async readActivity(kind) {
      return transaction(await ready(), [ACTIVITY], "readonly", tx => {
        const store = tx.objectStore(ACTIVITY);
        return request(kind ? store.index("kind").getAll(kind) : store.getAll());
      });
    }
  };
})(window);
