import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173',
    supportFile: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
  },
});
