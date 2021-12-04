describe('burger constructor', function() {
  before(function() {
    cy.visit('http://localhost:3000/login');
    cy.get('[name="email"]').type('rossifumi9@yandex.ru');
    cy.get('[name="password"]').type('Daurstyled46');
    cy.get('button').click();
  });

  it('open ingredient details', function() {
    cy.contains('Краторная булка N-200i').click()
    cy.contains('Детали ингредиента');
    cy.get('[class^=styles_modal]').as('details');
    cy.get('@details').contains('Краторная булка N-200i');
    cy.get('@details').contains('420');
    cy.get('@details').contains('80');
    cy.get('@details').contains('24');
    cy.get('@details').contains('53');
    cy.get('@details').find('[class^=styles_close]').click();
  })

  it('add bun', function() {
    cy.contains('Краторная булка N-200i').trigger('dragstart').as('bun');
    cy.get('.constructor').trigger('drop').as('box');
    cy.get('@box').should('exist');
    cy.get('@bun').find('[class^=counter]').should('contain', '2');
    cy.get('@box').contains('2510');
  });

  it('add ingredient', function() {
    cy.contains('Соус фирменный Space Sauce').trigger('dragstart').as('ingredient');
    cy.get('.constructor').trigger('drop').as('box');
    cy.get('@box').should('exist');
    cy.get('@ingredient').find('[class^=counter]').should('contain', '1');
    cy.get('@box').contains('2590');
  });

  it('make order', function() {
    cy.contains('Оформить заказ').click();
    cy.get('[class^=styles_modal]').as('modal');
    cy.get('@modal').contains('идентификатор заказа');
  })
}); 