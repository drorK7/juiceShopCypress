import contactPage from '../../pages/contact.page'
import commentsJson from '../../fixtures/comments.json'

describe('Regression tests', () => {
  before(() => {
    cy.visit('/#/contact')
    //Pop up that happend on the first couple of runs, I keep the code here incase it displays.
    // contactPage.loginPopUp.closeButton().click()
  })
  it('Verify comment validation message', () => {
    //Check natural state of the comment fields.
    contactPage.comment.hintMessage().contains('Max. 160 characters').should('be.visible').and('have.css', 'color', 'rgba(255, 255, 255, 0.7)');
    contactPage.comment.outline().should('have.css', 'color','rgb(255, 255, 255)')
    contactPage.comment.textBox().type('Testing')
    contactPage.comment.hintMessage().contains('Max. 160 characters').should('be.visible').and('have.css', 'color', 'rgba(255, 255, 255, 0.7)');
    contactPage.comment.textBox().clear()
    contactPage.comment.textBox().blur()
    //Textbox without input validation error red indication
    contactPage.comment.outline().should('have.css', 'color','rgb(255, 87, 34)')
    contactPage.comment.hintMessage().should('not.exist')
    contactPage.comment.error().contains('Please provide a comment.').should('be.visible').and('have.css', 'color', 'rgb(255, 87, 34)');

  })
  it('Verify comment 160 string max', () => {
    contactPage.comment.charsCounter().should('not.exist')
    //should indicate green outline for valid input
    contactPage.comment.textBox().type(commentsJson.maxString)
    contactPage.comment.charsCounter().contains('160/160')
    contactPage.comment.outline().should('have.css', 'color','rgb(104, 159, 56)')
    contactPage.comment.textBox().clear()
    contactPage.comment.charsCounter().should('not.exist')

  })
  it('Verify 0 rating validation', () => {
    contactPage.comment.textBox().type(commentsJson.maxString)
    cy.solveCaptcha()
    //By deafult we get 0 on the rating, if there is no rating selected, form can not be submitted
    contactPage.submitFormButton().should('be.disabled')
    contactPage.rating.slider().click({
      force: true
    }).type('{rightarrow}{rightarrow}{leftarrow}');
    contactPage.rating.root().should('have.attr', 'aria-valuenow', '2');
  })
  it('Validate captcha messages', () => {
    //Checking various colors of error messages regarding captcha
    //Invalid string should indicate red outline and message
    contactPage.captcha.TextBox().type('AnyString')
    contactPage.captcha.outline().should('have.css', 'color','rgb(255, 87, 34)')
    contactPage.captcha.error().contains('Invalid CAPTCHA code').should('be.visible').and('have.css', 'color', 'rgb(255, 87, 34)');
    contactPage.captcha.TextBox().clear()
    //valid string should indicated green outline
    contactPage.captcha.TextBox().type('1020123842933')
    contactPage.captcha.outline().should('have.css', 'color','rgb(104, 159, 56)')
    contactPage.submitFormButton().click()
    contactPage.errorPopUp().contains('Wrong answer to CAPTCHA. Please try again.')
    contactPage.captcha.TextBox().clear()
    cy.solveCaptcha();
    contactPage.closePopUpButton().click()

  }),
  it('mock an error (500) while sending contact form', () => {
    cy.intercept('POST', '/api/Feedbacks', (req) => {
        req.reply({
            statusCode: 500,
            body: {
                status: 'error',
                message: 'Internal Server Error',
            },
        })
    }).as('feedbackApi');

    contactPage.submitFormButton().click();

    cy.wait('@feedbackApi').then((interception) => {
        expect(interception.response.statusCode).to.equal(500);
        expect(interception.response.body.status).to.equal('error');
        expect(interception.response.body.message).to.equal('Internal Server Error');
    })
    contactPage.confirmPopUp().should('not.exist')
  })
})