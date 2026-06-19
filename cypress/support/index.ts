/// <reference types="cypress" />

// Custom commands and global setup
Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', '/api/login', { username, password }).then(response => {
    localStorage.setItem('token', response.body.token);
  });
});

// Theme toggle helper
Cypress.Commands.add('toggleTheme', () => {
  cy.get('[data-testid="theme-toggle"]').click();
});

// Search helper
Cypress.Commands.add('searchTemplates', query => {
  cy.get('[data-testid="search-input"]').clear().type(query);
  cy.wait(500);
});
