import '@testing-library/jest-dom';

// TypeScript environment augmentation
declare global {
  namespace jest {
    interface Matchers<R, T = any> {
      toHaveClass(expectedClass: string): R;
    }
  }
}
