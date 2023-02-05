/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'
import HomePage from '../pageObjects/HomePage'
import ProductsPage from '../pageObjects/ProductsPage'

describe('My Sixth Test Suite', function () {

    //Hooks
    before(function () {
        // root-level hook for setups
        // runs once before all tests
        //fixture is added below along with a resolved promise
        cy.fixture('example').then(function (data) {
            //scope of the variable is given to the whole class
            this.data = data
        })
    })

    it('My FirstTest case', function () {

        //Cypress.env must be used instead of Cypress.config for global env variables
        Cypress.env('url')
        cy.visit((Cypress.env('url')+"/angularpractice/"))

        //Implementing Page Object design pattern, each web page will have it's own class to declare page objects - to centralize objects
        //'pageObjects' folder is imported to this class and then an object is created

        const homeP = new HomePage()
        homeP.getEditBox().type(this.data.name)
        homeP.getEditBox().should('have.attr', 'minlength', '2')
        homeP.getGender().select(this.data.gender)
        homeP.getTwoWayDataBinding().should('have.value', this.data.name)
        homeP.getEntreprenuerRadioButton().should('be.disabled')

        homeP.getShopTab().click()

        const prodPage = new ProductsPage()
        cy.selectProduct('Samsung Note 8')
        cy.selectProduct("iphone X")
        prodPage.getCheckoutButton().click()

        var calTotalProdPrice = 0

        cy.get('tr td:nth-child(4) strong').each(($e1, index, $list) => {
            cy.log($e1.text())
            //to spilt price ₹. 85000 and change format (text, split, trim are from JS)
            const actualPrice = $e1.text()
            var splitPrice = actualPrice.split(" ")
            const prodPrice = splitPrice[1].trim()
            cy.log(prodPrice)
            //prodPrice & TotalProdPrice Strings must be converted to Numbers
            calTotalProdPrice = Number(calTotalProdPrice) + Number(prodPrice)

            //Promise is resolved below to make sure log is printed after the loop above (to avoid asynchronous nature)
        }).then(function () {
            cy.log(calTotalProdPrice)
        })

        cy.get('h3 > strong').then(function ($e2) {
            const actualTotal = $e2.text()
            var splitTotal = actualTotal.split(" ")
            const prodTotal = splitTotal[1].trim()
            cy.log(prodTotal)

            expect(Number(prodTotal)).to.equal(calTotalProdPrice)
        })


        prodPage.getConfirmCheckoutBtn().click()
        prodPage.getLocationTxt().type("Srilanka")
        //defaultCommandTimeout:4000 can be overridden in cypress.json config file and used globally
        //for a single test (explicit timeout) it can be added as below, has to be added in cypress.json as well to override default config
        Cypress.config('defaultCommandTimeout', 8000)
        prodPage.getLocationSuggestion().click()
        //DOM manipulation to avoid the element which is covered
        prodPage.getCheckbox().check({ force: true }).should('be.checked')
        prodPage.getPurchaseBtn().click()

        //prodPage.getSuccessMessage().should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
        //Extact match cannot be found for the above due to aditional characters therefore has to be done as below using partial text comparison,
        //since Jquery is used, promise must be resolved and text must be grabbed from the message

        prodPage.getSuccessMessage().then(function (element) {
            const actualElement = element.text()
            //Chai assertion is used to check if returned value is true
            expect(actualElement.includes("Success")).to.be.true
        })
    })
})