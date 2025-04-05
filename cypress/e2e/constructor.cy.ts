describe('Burger Constructor Integration Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.setCookie('token', 'token');
    window.localStorage.setItem('token', 'token');
    cy.visit('/');
  });

  const addIngredient = (name: string) => {
    cy.contains('li', name).contains('Добавить').click();
  };

  const checkBunPosition = (name: string, position: 'top' | 'bottom') => {
    const positionClass = `.constructor-element_pos_${position}`;
    cy.get(positionClass).within(() => {
      cy.contains('.constructor-element__text', name).should('exist');
    });
  };

  const checkFillingCounter = (name: string, count: number) => {
    cy.contains('li', name)
      .find('.counter__num')
      .should('have.text', count.toString());
  };

  const modal = () => cy.get('#modals');

  describe('Constructor Functionality', () => {
    it('Should correctly add buns and ingredients to constructor', () => {
      addIngredient('Краторная булка N-200i');
      addIngredient('Флюоресцентная булка R2-D3');

      checkBunPosition('Флюоресцентная булка R2-D3', 'top');
      checkBunPosition('Флюоресцентная булка R2-D3', 'bottom');

      addIngredient('Соус традиционный галактический');
      addIngredient('Соус традиционный галактический');
      checkFillingCounter('Соус традиционный галактический', 2);
    });
  });

  describe('Modal Window Operations', () => {
    const openIngredientModal = (name: string) => {
      cy.contains('li', name).click();
    };

    it('Should open and display ingredient details modal', () => {
      openIngredientModal('Краторная булка N-200i');
      modal().within(() => {
        cy.contains('Детали ингредиента').should('be.visible');
        cy.contains('Краторная булка N-200i').should('exist');
      });
    });

    it('Should close modal using close button', () => {
      openIngredientModal('Краторная булка N-200i');
      modal().within(() => {
        cy.get('button').first().click();
      });
      modal().should('be.empty');
    });

    it('Should close modal by clicking overlay', () => {
      openIngredientModal('Краторная булка N-200i');
      cy.get('body').click(0, 0);
      modal().should('be.empty');
    });
  });

  describe('Order Creation Process', () => {
    it('Should complete order creation and reset constructor', () => {
      addIngredient('Флюоресцентная булка R2-D3');
      addIngredient('Соус традиционный галактический');
      addIngredient('Соус традиционный галактический');

      cy.contains('button', 'Оформить заказ').click();
      cy.wait('@postOrder');

      modal().within(() => {
        cy.contains('123456').should('exist');
        cy.get('button').first().click();
      });

      cy.contains('Выберите булки').should('be.visible');
      cy.contains('Выберите начинку').should('be.visible');
      cy.get('.constructor-element_pos_top').should('not.exist');
    });
  });
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
