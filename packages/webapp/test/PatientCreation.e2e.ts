import 'cypress-keycloak';
import 'reflect-metadata';
import { PATIENT_MOCK } from './mocks/patient';

describe('PatientCreation', () => {
  it('redirects if not connected', () => {
    cy.intercept('GET', 'http://localhost:8080/realms/embleema-iam/protocol/openid-connect/*').as('authRequest');

    cy.visit('/patient-creation');

    cy.wait('@authRequest').then((interceptor: any) => {
      expect(interceptor.state).to.eq('Complete');
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
    });

    it('redirects to the patient form', () => {
      cy.visit('/');

      cy.get('button').first().click();

      expect(window.location).contain(/create-patient/);
    });

    // it.only('submits the form', () => {
    //   cy.intercept('POST', `http://localhost:3000/patients`, {
    //     statusCode: 200,
    //     body: [PATIENT_MOCK],
    //   }).as('createPatient');

    //   cy.visit('/');

    //   cy.get('button').first().click();

    //   cy.get('input[data-testid=form-field-firstName').type(PATIENT_MOCK.firstName);
    //   cy.get('input[data-testid=form-field-lastName').type(PATIENT_MOCK.lastName);
    //   cy.get('input[data-testid=form-field-socialSecurityId').type(PATIENT_MOCK.socialSecurityId);
    //   cy.get('input[data-testid=form-field-condition').type(PATIENT_MOCK.condition);
    //   cy.get('input[data-testid=form-field-usualPhysicianTitle').type(PATIENT_MOCK.usualPhysician.title);
    //   cy.get('input[data-testid=form-field-usualPhysicianFirstName').type(PATIENT_MOCK.usualPhysician.firstName);
    //   cy.get('input[data-testid=form-field-usualPhysicianLastName').type(PATIENT_MOCK.usualPhysician.lastName);
    //   cy.get('input[data-testid=form-field-usualCareSiteName').type(PATIENT_MOCK.usualCareSite.name);
    //   cy.get('input[data-testid=form-field-usualCareSiteAddress').type(PATIENT_MOCK.usualCareSite.address);

    //   cy.get('button').first().click();

    //   cy.wait('@createPatient');
    // });
  });
});
