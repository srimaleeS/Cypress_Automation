/// <reference types="Cypress" />

describe('My Third Test Suite', function () {

    it('My FirstTest case', function () {


        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        //be. is behaviour
        cy.get('#checkBoxOption1').check().should('be.checked')
        //to check the value/text of the checkbox seperately
        cy.should('have.value', 'option1')
        //or both of the above can be done in one line as below,
        cy.get('#checkBoxOption2').check().should('be.checked').and('have.value', 'option2')

        cy.get('#checkBoxOption3').check().should('be.checked')
        //to uncheck
        //cy.get('#checkBoxOption1').uncheck()
        //to uncheck and verify if it's checked
        cy.get('#checkBoxOption3').uncheck().should('not.be.checked')

        cy.get('#checkBoxOption3').check().should('be.checked')
        //to check/uncheck all checkboxes
        cy.get('input[type="checkbox"]').uncheck()
        //to check/uncheck multiple checkboxes
        cy.get('input[type="checkbox"]').check(['option1', 'option2'])

        //'check' and click can be used for radio buttons as well
        cy.get('[value="radio1"]').check().should('be.checked')
        cy.get('[value="radio2"]').click().should('be.checked')

        //static dropdowns
        //tag name = select
        cy.get('select').select('option2').should('have.value', 'option2')

        //dynamic dropdowns
        //get the locator and go through each and every index returned by the array and grab it's text
        //returned text is a Jquery object, so the promise must be resolved (automatically in the method)
        cy.get('#autocomplete').type('ind')
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            if ($el.text() === "India") {
                $el.click();
            }
        })
        //assertion to check dynamic dropdown 
        cy.get('#autocomplete').should('have.value', 'India')

        //handling visible and invisible elements
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')
    })
})
