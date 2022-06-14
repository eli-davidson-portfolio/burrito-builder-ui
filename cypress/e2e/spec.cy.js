beforeEach(() => {
    cy.intercept('GET','http://localhost:3001/api/v1/orders' ,{fixture: 'orders.json'}).as('getOrders')
    cy.visit('localhost:3000')
})

describe('App', () => {
    it('Should exist', () => {
        cy.get('.App').should('exist')
    })

    it('Should contain an Order Form', () => {
        cy.get('.App').within(() => {
            cy.get('.OrderForm').should('exist')
        })
    })

    it.skip('Should contain an Orders Section', () => {
        cy.get('.App').within(() => {
            cy.get('.Orders').should('exist')
        })
    })
})

describe('Order Form', () => {
    it('Should exist', () => {
        cy.get('.OrderForm').should('exist')
    })

    it('Should contain a name input', () => {
        cy.get('.OrderForm').within(() => {
            cy.get('input').should('have.attr', 'name').and('equal', 'name') 
        })
    })

    it('Name input should be empty by default', () => {
        cy.get('.OrderForm').within(() => {
            cy.get('input').invoke("text").should("eq", "");
        })
    })

    it('Should contain ingredients buttons', () => {
        cy.get('.OrderForm').within(() => {
            cy.get('.ingredientButton').should('have.length', 12)
        })
    })

    it('Should contain an order display', () => {
        cy.get('.OrderForm').within(() => {
            cy.get('.orderDisplay').should('exist')
        })
    })

    it('Order display should read "Nothing selected" by default', () => {
        cy.get('.OrderForm').within(() => {
            cy.get('.orderDisplay').invoke("text").should("eq", "Order: Nothing selected");
        })
    })

    it('Should contain a submit order button', () => {
        cy.get('.OrderForm').within(() => {
            cy.get('.submitOrder').should('exist')
        })
    })

    it('Submit order button should be disabled by default', () => {
        cy.get('.OrderForm').within(() => {
            cy.get('.submitOrder').should('have.attr', 'disabled').and('equal', 'disabled') 
        })
    })
})