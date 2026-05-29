describe('Mouseover', () => {
    it('Deve mostrar o texto ao passar o mouse por cima', () => {
        cy.start()
        cy.submitLogin('papito@webdojo.com', 'katana123')
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!').should('exist')



    })
})