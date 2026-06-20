import { defineConfig } from 'cypress';
import { definePerTestTimeouts } from '@cypress/code-coverage/dist/common';
import { getVideoOptions } from 'cypress-mochawesome-reporter/dist/config';
import { definePerTestVideoOptions } from '@cypress/code-coverage/dist/common';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      definePerTestTimeouts(config, {
        default: 10000,
        command: 5000,
        pageLoad: 30000,
        request: 5000,
      });
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173',
    supportFile: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportFilename: 'cypress/results/report',
      reportTitle: 'Swift Template Gallery E2E Tests',
      charts: true,
      embedScreenshot: true,
      embedBase64: true,
      overwrite: true,
      html: true,
      json: true,
    },
  },
});
