/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('My Fourth Test Suite', function () {

    it('My FirstTest case', function () {

        //visit() allows only one super domain to be used at a time
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        //handling alerts - alerts & pop-ups will be accepted automatically in Cypress
        cy.get('#alertbtn').click()
        //customized syntax [value="Confirm"]
        cy.get('[value="Confirm"]').click()
        //cypress doesn't have any inbuilt commands to view content on the alert therefore must listen to browser events
        //window:alert event must be triggered from Cypress, Cypress can manipulate the browser DOM (Selenium cannot)
        //the firing event and the output must be added as below
        cy.on('window:alert', (str) => {
            //mocha
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })

        //confirm-alert handling, window:confirm event must be used
        cy.on('window:confirm', (str) => {
            //mocha
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })

        //switching to a child tab
        //to avoid flakiness (inconsistent results) cypress doesn't allow to switch to child tabs, but there is a work around
        //DOM needs to be manipulated in a way that it opens in the same window
        //.removeAttr() in jquery can be used to remove 'target="_blank"' attribute in DOM which makes it navigate to a new window
        cy.get('#opentab').invoke('removeAttr', 'target').click()
        //the above line will make the child tab open in the same tab

        //navigating back to parent tab
        cy.go('back')
        //to check url of current window includes string 'AutomationPractice' (substring assertion)
        cy.url().should('include', 'AutomationPractice')

        //handling dynamic web tables - scan the table to find string
        //customized locators must be used to find the string
        //xpath for 2nd 'td' in table = tr td[2], in css its tr td:nth-child(2) thenonly the 2nd column in the table will be selected
        cy.get('tr td:nth-child(2)').each(($e1, index, $list) => {
            const text = $e1.text()
            if (text.includes("Python")) {
                //to get price of the above course, move relevant 'td' sibling (of common parent)
                //.next() can be used to check immediate sibling value
                //.next() can ge used only for 'get' method
                //.text() cannot be concatonated after .next() since it is not a cypress command (it's a jquery object)
                //'then' promise is resolved by declaring a function .then(), then the extracted sibling is passed as an argument, it is then assigned to 'price' variable
                cy.get("tr td:nth-child(2)").eq(index).next().then(function (price) {
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                })
            }
        })

        //mouse hover triggered pop-ups - not supported by Cypress so we have to use jquery
        //'show' method in jquery is used to display the hidden elements
        //cy.get('#mousehover').invoke('show') will not work because this is the grandparent, we must take the parent instead
        cy.get('div.mouse-hover-content').invoke('show') //hidden element's parent
        cy.contains('Top').click()
        cy.url().should('include', 'top')
        //the following can be used to force click a hidden element (without clicking the button)
        cy.contains('Reload').click({ force: true })
        cy.url().should('not.include', 'top')

        //handling child windows/tabs
        //prop() will help to get the value of the property, and prop() is a non-cypress command therefore must resolve the promise
        cy.get('#opentab').then(function (e1) {
            const url = e1.prop('href')
            //cy.visit(url) cannot be added next since the main domain is different - security issue (hack)
            //target attribute must be removed to proceed
        })

        //iframes
        //get regex paths from https://rahulshettyacademy.com/mentorship because ChroPath can't read content in the iFrame
        cy.frameLoaded("#courses-iframe")
        cy.iframe().find("a[href*='mentorship']").eq(0).should('have.text', "Mentorship")
        cy.iframe().find("a[href*='mentorship']").eq(0).click()
        //cy.iframe().find("h1[class*='pricing-title']").should('have.length',2)
        cy.get(':nth-child(7) > fieldset > legend').should('have.text', 'iFrame Example')
    })
})