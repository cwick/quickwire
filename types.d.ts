// TODO: proper types for JSX
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: unknown;
  }
}
