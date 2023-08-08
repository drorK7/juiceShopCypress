function hintError() {
    return cy.get('.mat-error');
}

module.exports = {
    comment: {
        textBox() {
            return cy.get('#comment');
        },
        hintMessage() {
            return cy.get('.mat-hint');
        },
        error() {
            return hintError();
        },
        charsCounter() {
            return cy.get('#mat-hint-1');
        },
        outline() {
            return this.textBox()
                .parent()
                .parent()
                .find('.mat-form-field-outline')
                .eq(1);
        }
    },
    rating: {
        root() {
            return cy.get('#rating');
        },
        slider() {
            return this.root().find('.mat-slider-thumb');
        }
    },
    submitFormButton() {
        return cy.get('#submitButton');
    },
    loginPopUp: {
        closeButton() {
            return cy.get('[aria-label="Close Welcome Banner"]');
        }
    },
    captcha: {
        TextBox() {
            return cy.get('#captchaControl');
        },
        outline() {
            return this.TextBox()
            .parent()
            .parent()
            .find('.mat-form-field-outline')
            .eq(1);
        },
        error(){
            return hintError()
        }
    },
    errorPopUp() {
        return cy.get('.errorBar');
    },
    confirmPopUp(){
        return cy.get('.mat-simple-snackbar')
    },
    closePopUpButton(){
       return cy.get('.mat-simple-snackbar-action')
    },
    formField: {
        root() {
            return cy.get('.mat-form-field');
        },
        outLine() {
            return this.root().find('.mat-form-field-outline');
        }
    }
};
