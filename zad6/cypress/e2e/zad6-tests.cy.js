describe('Login page - automationexercise.com', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  it('should display login form', () => {
    cy.get('a[href="/login"]').click();
    cy.get('input[data-qa="login-email"]').should('be.visible').and('have.attr', 'placeholder');
    cy.get('input[data-qa="login-password"]').should('be.visible').and('have.attr', 'type', 'password');
    cy.get('button[data-qa="login-button"]').should('be.visible').and('not.be.disabled');
  });

  it('should login with valid credentials', () => {
    cy.get('a[href="/login"]').click();
    cy.get('input[data-qa="login-email"]').first().type('xtyhsiyneqmhefvtyv@poplk.com');
    cy.get('input[data-qa="login-password"]').first().type('Password123!');
    cy.get('button[data-qa="login-button"]').click();
    cy.get('li > a').contains('Logged in as').should('be.visible').and('have.css', 'color');
  });

  it('should log out a user', () => {
    cy.get('a[href="/login"]').click();
    cy.get('input[data-qa="login-email"]').first().type('xtyhsiyneqmhefvtyv@poplk.com');
    cy.get('input[data-qa="login-password"]').first().type('Password123!');
    cy.get('button[data-qa="login-button"]').click();
    cy.get('a[href="/logout"]').click();
    cy.url().should('eq', 'https://automationexercise.com/login');
    cy.get('a[href="/login"]').should('exist');
  });

  it('should show error with wrong credentials', () => {
    cy.get('a[href="/login"]').click();
    cy.get('input[data-qa="login-email"]').first().type('wrongemail@test.com');
    cy.get('input[data-qa="login-password"]').first().type('wrongpassword');
    cy.get('button[data-qa="login-button"]').click();
    cy.contains('p', 'Your email or password is incorrect!')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('should display signup form and register a new user', () => {
    cy.get('a[href="/login"]').click();
    cy.get('input[data-qa="signup-name"]').should('be.visible').type('NowyUzytkownik');
    cy.get('input[data-qa="signup-email"]').should('be.visible').type('uniqueuser123@test.com');
    cy.get('button[data-qa="signup-button"]').click();

    cy.get('input[id="id_gender1"]').check().should('be.checked');
    cy.get('input[id="password"]').should('be.visible').type('Password123!');
    cy.get('select[id="days"]').select('1').should('have.value', '1');
    cy.get('select[id="months"]').select('January').should('have.value', '1');
    cy.get('select[id="years"]').select('2000').should('have.value', '2000');
    cy.get('input[id="newsletter"]').check().should('be.checked');
    cy.get('input[id="optin"]').check().should('be.checked');
    cy.get('input[data-qa="first_name"]').type('frf').should('have.value', 'frf');
    cy.get('input[data-qa="last_name"]').type('frf').should('have.value', 'frf');
    cy.get('input[data-qa="company"]').type('MyCompany').should('have.value', 'MyCompany');
    cy.get('input[data-qa="address"]').type('123 Main St').should('have.value', '123 Main St');
    cy.get('input[data-qa="address2"]').type('Suite 4').should('have.value', 'Suite 4');
    cy.get('select[data-qa="country"]').select('India').should('contain', 'India');
    cy.get('input[data-qa="state"]').type('Maharashtra').should('have.value', 'Maharashtra');
    cy.get('input[data-qa="city"]').type('Mumbai').should('have.value', 'Mumbai');
    cy.get('input[data-qa="zipcode"]').type('400001').should('have.value', '400001');
    cy.get('input[data-qa="mobile_number"]').type('9876543210').should('have.value', '9876543210');
  });

  it('should check the visibility of the Products page', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    cy.get('.features_items').should('be.visible');
    cy.get('.features_items .col-sm-4').its('length').should('be.greaterThan', 0);
    cy.get('.product-overlay').should('exist');
  });

  it('should subscribe to newsletter successfully', () => {
    cy.get('input[id="susbscribe_email"]').type('newsletter@test.com');
    cy.get('button[id="subscribe"]').click();
    cy.get('.alert-success')
      .should('contain.text', 'You have been successfully subscribed!')
      .and('be.visible');
  });

it('should search for a product and display results', () => {
  cy.get('a[href="/products"]').click();
  cy.get('input[id="search_product"]').type('Dress');
  cy.get('button[id="submit_search"]').click();
  cy.get('.features_items').should('be.visible');
  cy.get('.features_items .col-sm-4').should('contain.text', 'Dress');
  cy.get('.product-image-wrapper img').first().should('have.attr', 'alt');
});

  it('should display product categories section', () => {
    cy.get('a[href="/products"]').click();
    cy.get('.category-products').should('be.visible');
    cy.get('.category-products').within(() => {
      cy.contains('Women').should('be.visible');
      cy.contains('Men').should('be.visible');
      cy.contains('Kids').should('be.visible');
    });
  });

  it('should expand and display subcategories under Women category', () => {
    cy.get('a[href="/products"]').click();
    cy.get('a[href="#Women"]').click();
    cy.get('#Women').should('have.class', 'in');
    cy.get('#Women ul li a').should('contain.text', 'Dress');
    cy.get('#Women ul li a').contains('Dress').click();
    cy.url().should('include', '/category_products/1');
  });

  it('should expand and display subcategories under Men category', () => {
    cy.get('a[href="/products"]').click();
    cy.get('a[href="#Men"]').click();
    cy.get('#Men').should('have.class', 'in');
    cy.get('#Men ul li a').contains('Tshirts').click();
    cy.url().should('include', '/category_products/3');
  });

  it('should expand and display subcategories under Kids category', () => {
    cy.get('a[href="/products"]').click();
    cy.get('a[href="#Kids"]').click();
    cy.get('#Kids').should('have.class', 'in');
    cy.get('#Kids ul li a').contains('Tops & Shirts').click();
    cy.url().should('include', '/category_products/5');
  });

  it('should add a product to the cart', () => {
    cy.get('a[href="/products"]').click();
    cy.get('[data-product-id="1"]').first().click();
    cy.get('.modal-content').should('be.visible');
    cy.contains('Continue Shopping').click();
    cy.get('a[href="/view_cart"]').first().click();
    cy.url().should('include', '/view_cart');
    cy.get('.cart_info').should('contain.text', 'Blue Top');
  });

  it('should add a product to the cart and proceed to checkout', () => {
    cy.get('a[href="/login"]').click();
    cy.get('input[data-qa="login-email"]').first().type('xtyhsiyneqmhefvtyv@poplk.com');
    cy.get('input[data-qa="login-password"]').first().type('Password123!');
    cy.get('button[data-qa="login-button"]').click();
    cy.get('li > a').contains('Logged in as').should('be.visible');
    cy.get('a[href="/products"]').click();
    cy.get('[data-product-id="2"]').first().click();
    cy.get('.modal-content').should('be.visible');
    cy.get('.btn.btn-success.close-modal').click();
    cy.get('a[href="/view_cart"]').first().click();
    cy.url().should('include', '/view_cart');
    cy.get('a.check_out').click();
    cy.url().should('include', '/checkout');
  });

  it('should remove a product from the cart', () => {
    cy.get('a[href="/products"]').click();
    cy.get('[data-product-id="1"]').first().click();
    cy.get('.btn.btn-success.close-modal').click();
    cy.get('a[href="/view_cart"]').first().click();
    cy.get('.cart_quantity_delete').first().click();
    cy.get('.cart_info').should('not.contain.text', 'Blue Top');
    cy.get('p.text-center').should('contain.text', 'Cart is empty!');
  });

  it('should display empty cart message on empty cart', () => {
    cy.get('a[href="/view_cart"]').first().click();
    cy.get('p.text-center')
      .should('be.visible')
      .and('contain.text', 'Cart is empty!');
    cy.get('p.text-center a').should('have.attr', 'href', '/products');
  });

  it('should display the brand names list', () => {
    cy.get('a[href="/products"]').click();
    cy.get('.brands-name').should('be.visible');
    cy.get('.brands-name ul li').its('length').should('be.greaterThan', 0);
  });

  it('should have clickable brand names that lead to the respective brand page', () => {
    cy.get('a[href="/products"]').click();
    cy.get('.brands-name ul li a').each(($link) => {
      cy.wrap($link)
        .should('have.attr', 'href')
        .and('match', /^\/brand_products\/[a-zA-Z\s&]+/);
    });
  });

  it('should display the number of products for each brand', () => {
    cy.get('a[href="/products"]').click();
    cy.get('.brands-name ul li').each(($li) => {
      cy.wrap($li)
        .find('span.pull-right')
        .invoke('text')
        .should('match', /^\(\d+\)$/);
    });
  });
it('should display the Contact Us page', () => {
  cy.get('a[href="/contact_us"]').click();
  cy.url().should('include', '/contact_us');
  cy.get('h2').should('contain.text', 'Get In Touch');
  cy.get('input[name="name"]').should('be.visible').and('have.attr', 'name', 'name');
  cy.get('input[name="email"]').should('be.visible').and('have.attr', 'type', 'email');
  cy.get('textarea[name="message"]').should('be.visible').and('have.attr', 'name', 'message');
});

it('should display product categories section', () => {
  cy.get('a[href="/products"]').click();
  cy.get('.category-products').should('be.visible');
  cy.get('.category-products').within(() => {
    cy.contains('Women').should('be.visible');
    cy.contains('Men').should('be.visible');
    cy.contains('Kids').should('be.visible');
    cy.contains('Women').should('have.attr', 'href');
    cy.contains('Men').should('have.attr', 'href');
    cy.contains('Kids').should('have.attr', 'href');
  });
});


});
