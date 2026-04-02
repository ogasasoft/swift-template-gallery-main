// Stub type declarations for @testing-library/dom
// Required because @testing-library/react re-exports from @testing-library/dom
// but @testing-library/dom is not installed as a direct dependency
declare module "@testing-library/dom" {
  export const screen: unknown;
  export const fireEvent: unknown;
  export const waitFor: unknown;
  export const within: unknown;
  export const waitForElementToBeRemoved: unknown;
  export const prettyDOM: unknown;
  export const logDOM: unknown;
  export const getDefaultNormalizer: unknown;
  export const buildQueries: unknown;
  export const createEvent: unknown;
  export const queries: unknown;
  export const getRoles: unknown;
  export const getNodeText: unknown;
  export const isInaccessible: unknown;
  export const configure: unknown;
  export const getConfig: unknown;
  export const act: unknown;
}
