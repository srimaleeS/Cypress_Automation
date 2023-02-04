/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'
import HomePage from '../pageObjects/HomePage'
import ProductsPage from '../pageObjects/ProductsPage'

describe('My Sixth Test Suite', function () {
    
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
 
        //Implementing Page Object design pattern, each web page will have it's own class to declare page objects - to centralize objects
        //'pageObjects' folder is imported to this class and then an object is created

       const homeP = new HomePage()
       homeP.getEditBox().type(this.data.name)
       homeP.getEditBox().should('have.attr','minlength','2')
       homeP.getGender().select(this.data.gender)
       homeP.getTwoWayDataBinding().should('have.value',this.data.name)
       homeP.getEntreprenuerRadioButton().should('be.disabled')

       homeP.getShopTab().click()

       const prodPage = new ProductsPage()
       prodPage.getCheckoutButton().click()
    })
})