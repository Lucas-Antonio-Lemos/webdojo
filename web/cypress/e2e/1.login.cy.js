describe('Login', () => {

    it('Deve realizar login com sucesso', () => {
        cy.start() //Encapsulado em commands.js
        cy.submitLogin('papito@webdojo.com', 'katana123')//Encapsulado em commands.js ... 

        //button[text()="Entrar"] = Xpath para encontrar o botão Entrar ...
        cy.contains('button', 'Entrar').should('be.visible')
            .click()
        cy.get('[data-cy="user-name"]').should('be.visible')
            .and('have.text', 'Fernando Papito')//verificação // validação do nome do usuário logado

        cy.get('[data-cy="welcome-message"]').should('be.visible')
            .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    })

    it('Não deve logar com senha inválida', () => {
        cy.start() //Encapsulado em commands.js
        cy.submitLogin('papito@webdojo.com', 'katana12')//Encapsulado em commands.js


        cy.contains('button', 'Entrar').should('be.visible')
            .click()
        cy.contains('Acesso negado! Tente novamente.').should('be.visible')

    })

    it('Não deve logar com email não cadastrado', () => {
        cy.start() //Encapsulado em commands.js
        cy.submitLogin('papito@webdojo.co', 'katana123')//Encapsulado em commands.js

        cy.contains('button', 'Entrar').should('be.visible')
            .click()
        cy.contains('Acesso negado! Tente novamente.').should('be.visible')

    })
})

