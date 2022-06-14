beforeEach(() => {
    cy.intercept('GET','http://localhost:3001/api/v1/orders' ,{fixture: 'orders.json'}).as('getOrders')
    cy.visit('localhost:3000')
})

describe('App', () => {
    it('Should exist', () => {
        cy.get('.App').should('exist')
    })
})