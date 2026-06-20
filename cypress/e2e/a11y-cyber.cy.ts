import 'cypress-axe';

describe('Accessibility Audit Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should pass all accessibility audits for the main page', () => {
    // Check page-level accessibility
    cy.injectAxe();
    cy.checkA11y(null, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  });

  it('should pass accessibility audits for template gallery', () => {
    cy.visit('/templates');
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      },
    });
  });

  it('should pass accessibility audits for template detail page', () => {
    cy.visit('/templates/react');
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      },
    });
  });

  it('should pass accessibility audits for search page', () => {
    cy.visit('/search');
    cy.get('input[type="search"]').type('react');
    cy.get('form').submit();
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      },
    });
  });

  it('should pass accessibility audits on dark mode toggle', () => {
    cy.visit('/');
    cy.injectAxe();

    // Toggle to dark mode
    cy.get('[aria-label="Toggle dark mode"]').click();

    // Check accessibility after theme toggle
    cy.checkA11y(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      },
    });
  });

  it('should pass accessibility audits on all navigation links', () => {
    cy.visit('/');
    cy.injectAxe();

    // Check all links
    cy.get('a[href]').each($link => {
      cy.wrap($link).should('be.visible');
      cy.wrap($link).should('have.attr', 'tabindex').and('not.equal', '-1');
      cy.wrap($link).should('have.attr', 'role').and('not.equal', 'presentation');
    });

    // Verify keyboard navigation
    cy.get('a[href]').first().focus();
    cy.get('a[href]').first().tab();
  });

  it('should pass accessibility audits on form elements', () => {
    cy.visit('/search');
    cy.injectAxe();

    // Check search input
    cy.get('input[type="search"]').should('have.attr', 'aria-label');
    cy.get('input[type="search"]').should('have.attr', 'autocomplete');

    // Check search form
    cy.get('form').should('have.attr', 'role', 'search');
    cy.get('form').should('have.attr', 'method', 'get');
  });

  it('should pass accessibility audits on all buttons', () => {
    cy.visit('/');
    cy.injectAxe();

    // Check all buttons
    cy.get('button').each($button => {
      cy.wrap($button).should('be.visible');
      cy.wrap($button).should('have.attr', 'aria-label');
    });
  });

  it('should pass accessibility audits on all interactive elements', () => {
    cy.visit('/');
    cy.injectAxe();

    // Check all interactive elements
    cy.get('[tabindex="0"], button, a[href], input, select, textarea').each($el => {
      cy.wrap($el).should('be.visible');
      if ($el.is('button')) {
        cy.wrap($el).should('have.attr', 'aria-label');
      }
      if ($el.is('input')) {
        cy.wrap($el).should('have.attr', 'aria-label');
      }
    });
  });

  it('should pass accessibility audits on responsive design', () => {
    // Mobile view (375px)
    cy.viewport(375, 667);
    cy.visit('/');
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      },
    });

    // Tablet view (768px)
    cy.viewport(768, 1024);
    cy.visit('/');
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      },
    });
  });
});
