beforeEach(() => {
    cy.intercept('GET', {fixture: 'orders.json'}).as('getOrders')
    cy.visit('localhost:3000')
})

describe('App', () => {
    it('Should exist', () => {
        cy.get('.App').should('exist')
    })
})