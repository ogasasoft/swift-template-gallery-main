// Stub type declarations for @testing-library/dom
// Required because @testing-library/react re-exports from @testing-library/dom
// but @testing-library/dom is not installed as a direct dependency
declare module "@testing-library/dom" {
  export const screen: any;
  export const fireEvent: any;
  export const waitFor: any;
  export const within: any;
  export const waitForElementToBeRemoved: any;
  export const prettyDOM: any;
  export const logDOM: any;
  export const getDefaultNormalizer: any;
  export const buildQueries: any;
  export const createEvent: any;
  export const queries: any;
  export const getRoles: any;
  export const getNodeText: any;
  export const isInaccessible: any;
  export const configure: any;
  export const getConfig: any;
  export const act: any;
}
