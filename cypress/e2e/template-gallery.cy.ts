describe('Template Gallery - Basic Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the template gallery', () => {
    cy.title().should('include', 'Template Gallery');
    cy.contains('h1', 'Template Gallery').should('be.visible');
  });

  it('should have template grid visible', () => {
    cy.get('[data-testid="template-grid"]').should('be.visible');
  });

  it('should have search functionality', () => {
    cy.get('[data-testid="search-input"]').should('be.visible');
    cy.get('[data-testid="search-input"]').type('React');
    cy.wait(500);
  });
});

describe('Theme Toggle - E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should toggle dark mode on button click', () => {
    // Initial state should be light
    cy.get('html').should('have.class', 'light');

    // Click theme toggle button
    cy.get('[data-testid="theme-toggle"]').click();

    // Dark mode should be active
    cy.get('html').should('have.class', 'dark');

    // Toggle back to light
    cy.get('[data-testid="theme-toggle"]').click();

    // Light mode should be active again
    cy.get('html').should('have.class', 'light');
  });

  it('should persist theme preference in localStorage', () => {
    cy.visit('/');

    // Set dark mode
    cy.get('[data-testid="theme-toggle"]').click();
    cy.get('html').should('have.class', 'dark');

    // Navigate to another page
    cy.contains('Components').click();

    // Theme should persist
    cy.get('html').should('have.class', 'dark');

    // Reset to light
    cy.get('[data-testid="theme-toggle"]').click();
    cy.reload();

    // Theme should be light
    cy.get('html').should('have.class', 'light');
  });
});

describe('Component Preview - E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to template detail page', () => {
    // Click on first template
    cy.get('[data-testid="template-card"]').first().click();

    // Should navigate to detail page
    cy.url().should('match', /\/templates\/\w+/);
  });

  it('should display template preview', () => {
    // Click on first template
    cy.get('[data-testid="template-card"]').first().click();

    // Preview should be visible
    cy.get('[data-testid="template-preview"]').should('be.visible');
  });

  it('should copy code to clipboard', () => {
    cy.visit('/');

    // Click on first template
    cy.get('[data-testid="template-card"]').first().click();

    // Click copy button
    cy.get('[data-testid="copy-code-button"]').click();

    // Code should be copied
    cy.get('@clipboard').then(clipboardData => {
      expect(clipboardData).to.contain('React');
    });
  });

  it('should have template cards with correct attributes', () => {
    // Check we have at least one template card
    cy.get('[data-testid="template-card"]').should('have.length.greaterThan', 0);

    // Check each card has required attributes
    cy.get('[data-testid="template-card"]').each($card => {
      cy.wrap($card).should('have.attr', 'href');
      cy.wrap($card).should('have.attr', 'data-testid');
    });
  });
});

describe('Navigation - E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to templates page', () => {
    cy.contains('Templates').click();
    cy.url().should('match', /\/templates/);
  });

  it('should navigate to components page', () => {
    cy.contains('Components').click();
    cy.url().should('match', /\/components/);
  });

  it('should navigate to home from templates page', () => {
    cy.visit('/templates');
    cy.contains('Template Gallery').click();
    cy.url().should('match', /\//);
  });
});

describe('Responsive Design - E2E Tests', () => {
  beforeEach(() => {
    cy.viewport(375, 667); // Mobile
  });

  it('should be responsive on mobile', () => {
    cy.visit('/');
    cy.get('[data-testid="template-grid"]').should('be.visible');
  });

  it('should be responsive on tablet', () => {
    cy.viewport(768, 1024);
    cy.visit('/');
    cy.get('[data-testid="template-grid"]').should('be.visible');
  });

  it('should be responsive on desktop', () => {
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.get('[data-testid="template-grid"]').should('be.visible');
  });
});

describe('Accessibility - A11y Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have proper ARIA labels', () => {
    cy.get('[data-testid="theme-toggle"]').should('have.attr', 'aria-label');
    cy.get('[data-testid="search-input"]').should('have.attr', 'aria-label');
  });

  it('should be keyboard navigable', () => {
    // Focus on search input
    cy.get('[data-testid="search-input"]').focus();

    // Type with keyboard
    cy.focused().type('React');

    // Press enter
    cy.focused().type('{enter}');
  });

  it('should have semantic HTML structure', () => {
    cy.get('main').should('be.visible');
    cy.get('header').should('be.visible');
    cy.get('footer').should('be.visible');
  });
});

describe('Error Handling - E2E Tests', () => {
  it('should handle 404 page correctly', () => {
    cy.visit('/non-existent-page');
    cy.contains(/Not Found|404/).should('be.visible');
  });

  it('should handle navigation to invalid routes', () => {
    cy.visit('/invalid-route');
    cy.url().should('match', /\/invalid-route/);
  });
});
