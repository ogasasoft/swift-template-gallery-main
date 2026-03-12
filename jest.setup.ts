import '@testing-library/jest-dom';
import type { expect, jest } from '@jest/globals';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(expectedClasses: string): R;
    }
  }
}
