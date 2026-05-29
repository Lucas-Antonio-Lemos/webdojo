describe('Links em nova guia', () => {
    it('Validando o atributo do link do instagram', () => {
        cy.start()
        cy.submitLogin('papito@webdojo.com', 'katana123')
        cy.get('[data-cy="instagram-link"]')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')//verificando se tem o atributo
            .and('have.attr', 'target', '_blank')//verificando se abre em outra guia


    })
    it.only('Acessa link de termos de uso removendo target blank', () => {
        cy.start()
        cy.submitLogin('papito@webdojo.com', 'katana123')
        cy.contains('Formulários').click()
        cy.contains('a', 'termos de uso')
        .invoke('removeAttr','target')
        .click()
        cy.contains('h1','Termos de Uso')
        .should('be.visible')



    })
})