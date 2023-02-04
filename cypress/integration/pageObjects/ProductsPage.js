class ProductsPage{

    getCheckoutButton(){
        return cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link')
    }

    getConfirmCheckoutBtn(){
        return cy.get(':nth-child(4) > :nth-child(5) > .btn')
    }

    getLocationTxt(){
        return cy.get('#country')
    }

    getLocationSuggestion(){
        return cy.get('.suggestions > ul > li > a')
    }
}

export default ProductsPage;
