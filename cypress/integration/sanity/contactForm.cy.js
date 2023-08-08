import contactPage from '../../pages/contact.page'

describe('Santiy tests', () => {
  it('Input valid values and submit the form', () => {
    cy.visit('/#/contact')
    contactPage.comment.textBox().type('Very Nice')
    contactPage.rating.slider().click({
      force: true
    }).type('{rightarrow}');
    cy.solveCaptcha()
    cy.intercept('POST', '/api/Feedbacks').as('feedbackApi');
    contactPage.submitFormButton().click();
    cy.wait('@feedbackApi').then((req) => {
      // Assertion on the status code
      expect(req.response.statusCode).to.equal(201);
      expect(req.response.body.status).to.equal("success");
      expect(req.response.body.data.comment).to.equal('Very Nice (anonymous)');
      expect(req.response.body.data.rating).to.equal(2);
      expect(req.response.body.data.updatedAt).to.be.a('string');
      expect(req.response.body.data.createdAt).to.be.a('string');
    })
    contactPage.confirmPopUp().contains('Thank you for your feedback.')
  })
})
