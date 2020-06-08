describe("search for listings", () => {
    it("should use the home page search input fields to find house listings", () => {

        // 1. Visit the home endpoint at the baseUrl set in cypress.json.
        cy.visit("/");

        // 2. Here, we assert that the input field is visible. 
        // This is important because a real user won't be able to use 
        // the input if it is hidden behind another component.
        cy.get("header.app-header input.ant-input").should("be.visible");

        // 3. Type a search query in the header input field.
        cy.get("header.app-header input.ant-input").type("London");

        // 4. Click the search button.
        cy.get("header.app-header .ant-input-search-button").click();

        // 5. Assert that there should be a h3 on the results page containing the expected text.
        // Handily, if a cy command triggers a new page load, Cypress's default behaviour is 
        // to wait until the new page DOM is fully loaded before executing the next assertion.
        cy.contains("h3", "London, England, United Kingdom").should("exist");
        
    });
});