describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('can see the welcome page', () => {
    cy.contains('Welcome');
    cy.checkA11y();

    cy.get('button').contains('subscribe').click();
    cy.wait(1000);
    cy.checkA11y();

    cy.get('button').contains('Smashing Magazine').click();
    cy.wait(1000);
    cy.checkA11y();

    cy.get('article').eq(0).click();
    cy.wait(1000);
    cy.checkA11y();
  });

  it('can toggle dark mode', () => {
    cy.get('svg[aria-label="Settings"]').click();
    cy.get('button').contains('Dark theme').click();
    cy.wait(1000);
    cy.checkA11y();

    cy.get('button').contains('subscribe').click();
    cy.wait(1000);
    cy.checkA11y();

    cy.get('button').contains('Smashing Magazine').click();
    cy.wait(1000);
    cy.checkA11y();

    cy.get('article').eq(0).click();
    cy.wait(1000);
    cy.checkA11y();
  });
});

export {};
