const listeners = new Set();

export function emitBooksChanged() {
  listeners.forEach((fn) => {
    try { fn(); } catch {}
  });
}

export function onBooksChanged(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
