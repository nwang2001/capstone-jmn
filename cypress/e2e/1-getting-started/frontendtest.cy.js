describe("Front End Test", () => {

  it("successfully loads the home page", () => {
    // Visit the home page  
    cy.visit("http://localhost:3000");
  });

  it("successfully loads the sign page", () => {
    // Visit the home page  
    cy.visit("http://localhost:3000/Sign");
  });

  it("successfully loads the Login page", () => {
    // Visit the home page  
    cy.visit("http://localhost:3000/Login");
  });

  it("successfully loads the map page", () => {
    cy.visit("http://localhost:3000/Map");

    // Ensure the map is loaded
    cy.get(".map").should("exist");
  });

  it("inputs zipcode and checks if it loads addresses", () => {
    cy.visit("http://localhost:3000/Map");

    //  zipcode into the input field
    cy.get('.zipcode-input', { timeout: 10000 }).type('28202');

    // Clicks the 'Find Food Banks' button
    cy.get('.find-button').click();

    // Wait for the addresses to load
    cy.wait(5000);

    cy.get('.address-list').children().should('have.length.at.least', 5);
  });
});
