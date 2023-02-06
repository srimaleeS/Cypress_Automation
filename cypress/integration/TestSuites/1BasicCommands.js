// describe('My First Test', () => {
//     it('Does not do much!', () => {
//       expect(true).to.equal(true)
//     })
//   })

//to get Cypress suggesions when coding
/// <reference types="Cypress" />

//Mocha format
describe('My first test suite', function () {
    it('My 1st test case', function () {
        //test case 1 steps
        cy.visit("https://courses.rahulshettyacademy.com/p/cypress-testing-automation-tutorial");
    })

    it('My 2nd test case', function () {
        //test case 2 steps
        //cy.log('************************Second test case********************************');
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get('.search-keyword').type("Ca");
        cy.wait(2000);
        //Jquery selectors can be used to get visible elements ':visible'
        //'should' is an assertion type of Chai
        cy.get('.product:visible').should('have.length', 4);

        //parent child chaining
        cy.get('.products').find('.product').should('have.length', 4);

        //to add product 2 to the cart
        cy.get('.products').find('.product').eq(0).contains('ADD TO CART').click();
        cy.get(':nth-child(2) > .product-action > button').click();

        //dynamically identifying a product
        cy.get('.products').find('.product').each(($e1, index, $list) => {

            const vegtxt = $e1.find('h4.product-name').text()
            if (vegtxt.includes("Cashews")) {
                //        $e1.contains('ADD TO CART').click();
                //'find' cannot be used with 'click' therefore must be wrapped    
                cy.wrap($e1).find('button').click();
            }
        })
        //the code below will throw an error because promise is not resolved (non-cypress commands), therefore must be manually resolved
        //const logo = cy.get('.brand')
        //'logoElement' is the manually resolved promise, and then we can get it's text
        cy.get('.brand').then(function (logoElement) {
            cy.log(logoElement.text())
        })
        //        cy.log (logo.text());
    })

    it('My 3rd test case - optimized', function () {
        //cy.log('************************3rd test case********************************');
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get('.search-keyword').type("Ca");
        cy.wait(2000);
        cy.get('.product:visible').should('have.length', 4);


        //to assign cy.get('.products') to a 'variable', we can use 'Aliasing' to reuse locators
        cy.get('.products').as('productLocator');
        //the above can be called as follows
        cy.get('@productLocator');
        cy.get('@productLocator').find('.product').should('have.length', 4);

        //Cypress runs test directly on  the browser therefore will get printed in the browser console : dev tools > console
        //console.log is a JS command and will run async, 'cy.log' is a Cypress command
        console.log('This is logged in browser console - async')

        //if you want to evoke console.log command in sequence (sync), you have to manually handle the promise,
        cy.get('@productLocator').find('.product').eq(0).contains('ADD TO CART').click().then(function () {
            console.log('Cypress logs are logged in browser console : Cypress Runner > Inspect Element > Console - resolved promise - sync')
        })
        cy.get(':nth-child(2) > .product-action > button').click();

        //dynamically identifying a product
        cy.get('.products').find('.product').each(($e1, index, $list) => {

            const vegtxt = $e1.find('h4.product-name').text()
            if (vegtxt.includes("Cashews")) {
                cy.wrap($e1).find('button').click();
            }
        })

        //this is to print in Cypress logs  
        cy.get('.brand').then(function (logoElement) {
            cy.log(logoElement.text())
        })

        //asserting logo text
        cy.get('.brand').should('have.text', "GREENKART")

        //assertion failure test
        cy.get('.brand').should('have.text', "This is a failure test")

    })
})