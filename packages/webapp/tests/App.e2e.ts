
describe('App Load Test', () => {
  it('successfully loads and displays the main title', () => {
    cy.visit('/'); 
    cy.contains('h1', 'Embleema'); 
  });
});

