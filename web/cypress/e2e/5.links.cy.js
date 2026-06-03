describe('Links em nova guia', () => {
    beforeEach(() => {
        cy.login()//helper
    })
    it('Validando o atributo do link do instagram', () => {

        cy.get('[data-cy="instagram-link"]')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')//verificando se tem o atributo
            .and('have.attr', 'target', '_blank')//verificando se abre em outra guia


    })
    it('Acessa link de termos de uso removendo target blank', () => {

        cy.contains('Formulários').click()
        cy.contains('a', 'termos de uso')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('h1', 'Termos de Uso')
            .should('be.visible')



    })
})