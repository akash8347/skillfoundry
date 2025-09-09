// lib/eventHelper.js
export function genEventId() {
  try { if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID(); } catch (e) {}
  return 'ev_' + Date.now().toString(36) + Math.random().toString(36).slice(2);
}
