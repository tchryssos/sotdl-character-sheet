// See https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97

export function withWindow<R, F>(fn: () => R, fallback: F) {
  if (typeof window !== 'undefined') {
    return fn();
  }
  return fallback;
}
