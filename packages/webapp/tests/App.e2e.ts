import 'cypress-keycloak';

describe('App authentication', () => {
  describe('Regarding non authenticated users', () => {
    it('redirects to Keycloak login page', () => {
      cy.intercept('GET', 'http://localhost:8080/realms/embleema-iam/protocol/openid-connect/*').as('authRequest');

      cy.visit('/');

      cy.wait('@authRequest').then((interceptor: any) => {
        expect(interceptor.state).to.eq('Complete');
      });
    });
  });

  describe('Regarding authentication', () => {
    beforeEach(() => {
      cy.login({
        root: 'http://localhost:8080',
        path_prefix: '', // Ensures to not add default 'auth' prefix to root URL
        realm: 'embleema-iam',
        username: 'user',
        password: 'user',
        client_id: 'embleema-webapp',
        redirect_uri: 'http://localhost:5173/',
      }).then(() => {
        cy.wait(2000);
      });
    });

    it('successfully loads and displays the main title', () => {
      cy.visit('/');

      cy.contains('h1', 'Connected', { timeout: 10000 });
    });
  });
});
