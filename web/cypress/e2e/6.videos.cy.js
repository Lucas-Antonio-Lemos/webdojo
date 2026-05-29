describe('Interagindo com iframes',()=>{
    it('Deve clicar no vídeo',()=>{

        cy.start()
        cy.submitLogin('papito@webdojo.com','katana123')
        cy.contains('Video')
        .click()
        cy.get('iframe[title="Video Player"]')
        .should('exist')
        .its('0.contentDocument.body')
        .then(cy.wrap)
        .as('iFramePlayer')
        cy.get('@iFramePlayer')
        .find('.play-button')
        .click()
        cy.get('@iFramePlayer')
        .find('.pause-button')
        .should('be.visible')

    })
})