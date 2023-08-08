import feedbackJSON from '../../fixtures/feedback.json';

describe('Feedback API Test', () => {
  it('Create a new captcha, and verify the functionality', () => {
    let captchaId, answer;
    cy.request({
      url: '/rest/captcha/',
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
      failOnStatusCode: false,
    }).then((response) => {
      captchaId = response.body.captchaId;
      answer = response.body.answer;

      cy.request({
        method: 'POST',
        url: '/api/Feedbacks/',
        headers: {
          'Accept': 'application/json, text/plain, */*',
        },
        body: {
          ...feedbackJSON,
          captchaId: captchaId,
          captcha: answer,
        },
      }).then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body.status).to.equal('success');
        expect(response.body.data.id).to.be.a('number');
        expect(response.body.data.comment).to.equal('This is GREAT! (drorKedem)');
        expect(response.body.data.rating).to.equal(5);
      });
    });
  });
});