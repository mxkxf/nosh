describe("spec", () => {
  it("subscribes to a custom feed", () => {
    cy.visit("http://localhost:3000");
    cy.contains("New feed").click({ force: true });

    cy.contains("Subscribe");
    cy.get("#url").type("https://www.mikefrancis.dev/rss.xml");
    cy.get("button").contains("Subscribe").click({ force: true });
    cy.get("#feed-items li").first().click({ force: true });
  });

  it("subscribes to a random feed", () => {
    cy.visit("http://localhost:3000");
    cy.contains("New feed").click({ force: true });

    cy.contains("Subscribe");
    cy.get("button").contains("Add random feed").click({ force: true });
    cy.get("#feed-items li").first().click({ force: true });
  });

  it("displays an error when trying to subscribe to an invalid feed", () => {
    cy.visit("http://localhost:3000");
    cy.contains("New feed").click({ force: true });

    cy.contains("Subscribe");
    cy.get("#url").type("lol");
    cy.get("button").contains("Subscribe").click({ force: true });
    cy.contains("Error");
  });
});
