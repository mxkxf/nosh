describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Can see the welcome page', () => {
    cy.contains('Welcome');
  });
});
