import 'cypress-keycloak';
import 'reflect-metadata';
import { PATIENT_MOCK } from './mocks/patient';

describe('App', () => {
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

      cy.intercept('GET', `http://localhost:3000/patients`, {
        statusCode: 200,
        body: [PATIENT_MOCK],
      }).as('getPatients');
    });

    it('successfully loads and displays the main title', () => {
      cy.visit('/');

      cy.contains('h3', 'Patients', { timeout: 5_000 });
    });
  });
});

describe('Patients', () => {
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

    cy.intercept('GET', `${Cypress.env('VITE_EMBLEEMA_API_URL')}/patients`, {
      statusCode: 200,
      body: [PATIENT_MOCK],
    }).as('getPatients');
  });

  it('displays the list of the patients', () => {
    cy.visit('/');
    cy.wait('@getPatients');

    cy.contains('William Miller');
  });
});
