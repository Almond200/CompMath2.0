// Shared activity across the main app and the study tools. Practice sets already contain their
// attempts, so read those records directly and keep their grades in sync with saved review.
(function (root) {
  "use strict";
  const KEY = "mq-learning-activity";
  const VERSION = 1;
  function entries(data) {
    if (!data || data.version !== VERSION || !Array.isArray(data.events)) return [];
    return data.events.filter(event => event && typeof event.id === "string" &&
      typeof event.item === "string" && typeof event.source === "string" &&
      typeof event.type === "string" && Number.isFinite(event.at));
  }
  function merge(older, newer) {
    if ([older, newer].some(data => data && data.version !== VERSION)) throw new Error("Unsupported activity version");
    return { version: VERSION,
      events: [...new Map([...entries(older), ...entries(newer)].map(event => [event.id, event])).values()] };
  }
  function readStored(storage) {
    const data = JSON.parse(storage.getItem(KEY) || "null");
    if (data && data.version !== VERSION) throw new Error("Unsupported activity version");
    return data;
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
    let events = [], sets = [];
    if (root.StudyStorage?.enabled) events = await root.StudyStorage.readActivity(kind);
    else try { events = entries(readStored(storage)); } catch (error) {}
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
          kind: "problem", item: slug, at, outcome });
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
          ...(e.placement ? {placement:true} : {}), session:e.session, reviewNumber
        });
      }
    }
    if (kind) events = events.filter(event => event.kind === kind);
    return events.map(event => event.kind === "problem" ? { ...event, canonicalId: canonical(event.item) } : event)
      .sort((a, b) => (a.at ?? 0) - (b.at ?? 0));
  }
  const api = { KEY, merge, record, sawProblem, history };
  if (typeof module !== "undefined") module.exports = api;
  else root.LearningActivity = api;
})(typeof window === "undefined" ? globalThis : window);
