// Shared activity across the main app and the study tools. Practice sets already contain their
// attempts, so read those records directly and keep their grades in sync with saved review.
(function (root) {
  "use strict";
  const KEY = "mq-learning-activity";
  const VERSION = 1;
  const MISTAKE_BOOSTS = Object.freeze({
    concept: 0.5, starting: 0.45, recognition: 0.4, reasoning: 0.3, accuracy: 0.15, timing: 0.15, reading: 0.15, unsure: 0.05
  });
  function mistakeReasons(value) {
    if (!value) return [];
    const values = Array.isArray(value) ? value : [value];
    return Object.keys(MISTAKE_BOOSTS).filter(reason => values.includes(reason));
  }
  // Each reason adds evidence with diminishing returns. A result stays a single attempt.
  const mistakeBoost = value => 1 - mistakeReasons(value).reduce((remaining, reason) => remaining * (1 - MISTAKE_BOOSTS[reason]), 1);
  const canMarkMistake = (outcome, retry = false) => outcome === "incorrect" || outcome === "unanswered" || outcome === "correct" && retry;
  const mistakePrefix = (source, setId) => `mistake:${source}:${encodeURIComponent(setId)}:`;
  const mistakeId = (source, setId, item) => mistakePrefix(source, setId) + encodeURIComponent(item);
  const keepsNewerMistake = (stored, incoming) => incoming.type === "mistake" && stored?.at > incoming.at;

  function entries(data) {
    if (!data || data.version !== VERSION || !Array.isArray(data.events)) return [];
    return data.events.filter(event => event && typeof event.id === "string" &&
      typeof event.item === "string" && typeof event.source === "string" &&
      typeof event.type === "string" && Number.isFinite(event.at));
  }
  function merge(older, newer) {
    if ([older, newer].some(data => data && data.version !== VERSION)) throw new Error("Unsupported activity version");
    const events = new Map();
    for (const event of [...entries(older), ...entries(newer)]) {
      if (!keepsNewerMistake(events.get(event.id), event)) events.set(event.id, event);
    }
    return { version: VERSION, events: [...events.values()] };
  }
  function readStored(storage) {
    const data = JSON.parse(storage.getItem(KEY) || "null");
    if (data && data.version !== VERSION) throw new Error("Unsupported activity version");
    return data;
  }
  async function saveMistakes(source, setId, item, reasons) {
    const event = { id: mistakeId(source, setId, item), source, type: "mistake",
      kind: "mistake", item, outcome: mistakeReasons(reasons), at: Date.now() };
    if (root.StudyStorage?.enabled) return root.StudyStorage.appendActivity(event);
    const storage = root.localStorage;
    storage.setItem(KEY, JSON.stringify(merge(readStored(storage), { version: VERSION, events: [event] })));
  }
  async function mistakesFor(source, setId) {
    const events = root.StudyStorage?.enabled ? await root.StudyStorage.readActivity("mistake") : entries(readStored(root.localStorage));
    const prefix = mistakePrefix(source, setId);
    return new Map(events.filter(event => event.type === "mistake" && event.id.startsWith(prefix))
      .map(event => [event.item, mistakeReasons(event.outcome)]).filter(([, reasons]) => reasons.length));
  }
  function record(source, type, item, outcome, kind, id) {
    const at = Date.now();
    id ||= root.crypto?.randomUUID?.() || at.toString(36) + "-" + Math.random().toString(36).slice(2);
    try {
      const event = { id, source, type, item, outcome, kind, at };
      if (root.StudyStorage?.enabled) return root.StudyStorage.appendActivity(event).catch(() => {});
      const storage = root.localStorage;
      storage.setItem(KEY, JSON.stringify(merge(readStored(storage), { version: VERSION, events: [event] })));
    } catch (error) {
      // Activity can be unavailable without preventing the original study action from saving.
    }
  }
  function sawProblem(source, slug) {
    const canonical = root.ProblemCatalog?.canonicalId(root.MATH_PROBLEM_CATALOG, slug) || slug;
    return record(source, "exposure", slug, "opened", "problem", "opened:" + canonical);
  }
  async function history({ storage = root.localStorage, arenaState, kind, practice = root.PracticeSessions, arena = root.Arena, canonical = id => root.ProblemCatalog?.canonicalId(root.MATH_PROBLEM_CATALOG, id) || id } = {}) {
    let events = [], marks = [], sets = [];
    if (root.StudyStorage?.enabled) {
      [events, marks] = await Promise.all([root.StudyStorage.readActivity(kind),
        kind === "problem" ? root.StudyStorage.readActivity("mistake") : []]);
    } else try { events = entries(readStored(storage)); } catch (error) {}
    const mistakes = new Map([...events, ...marks].filter(event => event.type === "mistake")
      .map(event => [event.id, mistakeReasons(event.outcome)]));
    events = events.filter(event => event.type !== "mistake");
    const markFor = (source, setId, slug, outcome, retry) => {
      const reasons = canMarkMistake(outcome, retry) && mistakes.get(mistakeId(source, setId, slug));
      return reasons?.length ? { mistakes: reasons } : {};
    };
    try { if (practice) sets = practice.read(storage); } catch (error) {}
    for (const set of sets) {
      if (set.status !== "finished") continue;
      const at = set.finishedAt ?? set.updated ?? set.created ?? null;
      events.push({ id: "practice:" + set.id, source: "practice", type: "completion",
        kind: "set", item: set.id, at, outcome: set.timedOut ? "timed-out" : "submitted" });
      for (const slug of set.slugs) {
        const outcome = practice.result(set, slug).toLowerCase().replaceAll(" ", "-");
        events.push({ id: "practice:" + set.id + ":" + slug, source: "practice",
          type: set.answers[slug] && outcome !== "voided" ? "attempt" : "exposure",
          kind: "problem", item: slug, at, outcome, session:set.id, ...markFor("practice", set.id, slug, outcome) });
      }
    }
    if (arena) {
      const state = arenaState ?? await arena.read(root.StudyStorage?.enabled ? undefined : storage);
      const indices = new Map();
      for (const e of state.events) {
        const reviewNumber = (indices.get(e.session) || 0) + 1;
        indices.set(e.session,reviewNumber);
        events.push({
          id:"arena:" + e.identity, source:"arena", type:["seen","unanswered"].includes(e.outcome) ? "exposure" : "attempt",
          kind:"problem", item:e.slug, at:e.at, outcome:e.outcome, retry:!!e.firstMiss,
          ...markFor("arena", e.session, e.slug, e.outcome, !!e.firstMiss),
          ...(e.placement ? {placement:true} : {}), session:e.session, reviewNumber
        });
      }
    }
    if (kind) events = events.filter(event => event.kind === kind);
    return events.map(event => event.kind === "problem" ? { ...event, canonicalId: canonical(event.item) } : event)
      .sort((a, b) => (a.at ?? 0) - (b.at ?? 0));
  }
  const api = { KEY, merge, record, sawProblem, history, mistakeReasons, mistakeBoost, canMarkMistake, saveMistakes, mistakesFor, keepsNewerMistake };
  if (typeof module !== "undefined") module.exports = api;
  else root.LearningActivity = api;
})(typeof window === "undefined" ? globalThis : window);
