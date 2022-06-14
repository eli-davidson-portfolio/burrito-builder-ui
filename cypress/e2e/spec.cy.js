import orders from '../fixtures/orders.json'

beforeEach(() => {

    //cy.intercept('GET','http://localhost:3001/api/v1/orders' ,{fixture: 'orders.json'}).as('getOrders')
    cy.visit('localhost:3000')
    //cy.wait('@getOrders')
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

    it('Should contain an Orders Section', () => {
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

describe('Order', () => {
    it('Should exist', () => {
        cy.get('.order').first().should('exist')
    })

    it('Should contain a name', () => {
        cy.get('.order').first().within(() => {
          cy.get('h3').should('exist')
        })
    })

    it('First Order Name should be Pat', () => {
        cy.get('.order').first().within(() => {
          cy.get('h3').invoke("text").should("eq", "Pat");
        })
    })

    it('Shouild have an ingredients list', () => {
        cy.get('.order').first().within(() => {
          cy.get('.ingredient-list').within(() => {
            cy.get('li').should('have.length', 5)
          })
        })
        cy.get('.order').first().within(() => {
          cy.get('.ingredient-list').within(() => {
            cy.get('li').first().invoke("text").should("eq", "beans");
            cy.get('li').last().invoke("text").should("eq", "jalapeno");
          })
        })
    })



})


describe('User Stories', () => {
    it('Should be ablle to view orders', () => {
        cy.get('.App').within(() => {
            cy.get('.order').should('have.length', 3)
        })
    })
   

    it('Should be able to add a new name', () => {
        cy.get('.OrderForm').within(() => {
            cy.get('input').type("Creative Name");
            cy.get('input').should('have.attr', 'value').and('equal', 'Creative Name')
        })
    })

    it('Should be able to add ingredients', () => {
        cy.get('.OrderForm').within(() => {
            cy.get('.ingredientButton').first().click()
            cy.get('.orderDisplay').invoke("text").should("eq", "Order: beans");
            cy.get('.ingredientButton').last().click()
            cy.get('.orderDisplay').invoke("text").should("eq", "Order: beans, sour cream");
        })
    })

    it('Should be able to remove ingredients', () => {
        cy.get('.OrderForm').within(() => {
            cy.get('.ingredientButton').first().click()
            cy.get('.orderDisplay').invoke("text").should("eq", "Order: beans");
            cy.get('.ingredientButton').last().click()
            cy.get('.orderDisplay').invoke("text").should("eq", "Order: beans, sour cream");
            cy.get('.ingredientButton').last().click()
            cy.get('.orderDisplay').invoke("text").should("eq", "Order: beans");
            cy.get('.ingredientButton').first().click()
            cy.get('.orderDisplay').invoke("text").should("eq", "Order: Nothing selected");
        })
    })

    it('Should be able submit order when name and ingredient present', () => {
        cy.get('.OrderForm').within(() => {
            cy.get('input').type("Creative Name");
            cy.get('input').should('have.attr', 'value').and('equal', 'Creative Name')
        })
        cy.get('.OrderForm').within(() => {
            cy.get('.ingredientButton').first().click()
            cy.get('.orderDisplay').invoke("text").should("eq", "Order: beans");
            cy.get('.ingredientButton').last().click()
            cy.get('.orderDisplay').invoke("text").should("eq", "Order: beans, sour cream");
        })
        cy.get('.OrderForm').within(() => {
            cy.get('.submitOrder').not('have.attr', 'disabled').should('exist')
        })
    })

    it('Should not be able submit order when name or ingredient are missing', () => {
      cy.get('.OrderForm').within(() => {
            cy.get('input').type("Creative Name");
            cy.get('input').should('have.attr', 'value').and('equal', 'Creative Name')
      }) 
      cy.get('.OrderForm').within(() => {
            cy.get('.orderDisplay').invoke("text").should("eq", "Order: Nothing selected");
        })

        cy.get('.OrderForm').within(() => {
            cy.get('.submitOrder').should('have.attr', 'disabled').and('equal', 'disabled') 
        })

    })

    it('Should post and view new Order when clicking submit', () => {
        cy.get('.OrderForm').within(() => {
            cy.get('input').type("Creative Name");
            cy.get('input').should('have.attr', 'value').and('equal', 'Creative Name')
        })
        cy.get('.OrderForm').within(() => {
            cy.get('.ingredientButton').first().click()
            cy.get('.orderDisplay').invoke("text").should("eq", "Order: beans");
            cy.get('.ingredientButton').last().click()
            cy.get('.orderDisplay').invoke("text").should("eq", "Order: beans, sour cream");
        })
        cy.get('.OrderForm').within(() => {
            cy.get('.submitOrder').click()
        })
        cy.get('.App').within(() => {
            cy.get('.order').should('have.length', 4)
        })
        cy.get('.order').last().within(() => {
          cy.get('h3').invoke("text").should("eq", "Creative Name");
        })
        cy.get('.order').last().within(() => {
          cy.get('.ingredient-list').within(() => {
            cy.get('li').should('have.length', 2)
          })
        })
        cy.get('.order').last().within(() => {
          cy.get('.ingredient-list').within(() => {
            cy.get('li').first().invoke("text").should("eq", "beans");
            cy.get('li').last().invoke("text").should("eq", "sour cream");
          })
        })
    })
})
