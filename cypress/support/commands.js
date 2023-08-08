Cypress.Commands.add('solveCaptcha', () => {
  cy.get('#captcha').invoke('text').then((captchaText) => {
    const result = eval(captchaText);
    cy.get('#captchaControl').type(result);
  });
});