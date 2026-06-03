describe('Mouseover', () => {
    it('Deve mostrar o texto ao passar o mouse por cima', () => {
        cy.login()//helper
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!').should('exist')



    })
})