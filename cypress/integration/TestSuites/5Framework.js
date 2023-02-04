/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('My Fifth Test Suite', function () {
    
    //Hooks
    before(function() {
        // root-level hook for setups
        // runs once before all tests
        //fixture is added below along with a resolved promise
        cy.fixture('example').then(function(data){
            //scope of the variable is given to the whole class
            this.data = data
        })
      })

    it('My FirstTest case', function () {

        cy.visit("https://rahulshettyacademy.com/angularpractice/")
        //customized CSS
        //cy.get('input[name="name"]:nth-child(1)').type("Srimalee")
        //through Fixture
        cy.get('input[name="name"]:nth-child(1)').type(this.data.name)
        //CSS taken from Cypress Runner
        cy.get(':nth-child(2) > .form-control').type("srimalee@test.com")
        //cy.get('select').select("Female")
        //through Fixture
        cy.get('select').select(this.data.gender)

        //to check if two-way data binding field is filled automatically when name is type in the name field
        cy.get(':nth-child(4) > .ng-valid').should('have.value',this.data.name)
        //Name field validation, element has attribute minlength="2" OR can use prop() as well
        cy.get('input[name="name"]:nth-child(2)').should('have.attr','minlength','2')
        //to see if a radio button is disabled
        cy.get('#inlineRadio3').should('be.disabled')
    
        //adding multiple products from a dynamic list
        cy.get(':nth-child(2) > .nav-link').click()

        //grab all the text using a common locator and then iterate through array of text to find the required one
        cy.get('h4.card-title').each(($e1, index, $list) => {
            if ($e1.text().includes('Blackberry')){
                cy.get('button.btn.btn-info').eq(index).click()
            }
        })

        //customized cypress command for above - support folder > command.js
        //no need to import like in OOP or create objects
        cy.selectProduct('Samsung Note 8').debug()
        
        //to optimize the above to select multiple products (data sets), it can be added as an array: fixtures > example.json
        //the array can be returned as this.data.productName
        this.data.productName.forEach(function(element){
            cy.selectProduct(element)
        })

        //cy.pause() and .debug() will hold the execution
    })
})