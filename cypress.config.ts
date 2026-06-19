import { defineConfig } from 'cypress';
import { createBundler } from '@web/test-runner-bundler';
import { vitePreprocess } from '@vitejs/plugin-react';
import { createEsbuildPlugin } from '@web/test-runner-esbuild';

export default defineConfig({
  e2e: {
    supportFile: 'cypress/support/index.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
