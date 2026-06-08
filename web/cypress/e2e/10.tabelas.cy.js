describe('Gerenciamento de perfis do GitHub', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve adicionar um novo perfil no github', () => {


        cy.get('#name').type('Lucas Lemos')
        cy.get('#username').type('Lucas-Antonio')
        cy.get('#profile').type('QA')
        cy.contains('button', 'Adicionar Perfil').click()


        cy.get('#name').type('Lucas Lemos')
        cy.get('#username').type('Lucas-Antonio-Lemos')
        cy.get('#profile').type('QA')
        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', 'Lucas-Antonio-Lemos')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile') //usando alias em memória
            .contains('Lucas Lemos')
            .should('be.visible')

        cy.get('@trProfile')
            .should('be.visible')
            .contains('QA')
            .should('be.visible')






    })

    it('Deve validar o link do github', () => {
        const perfil = {
            name: 'Lucas Lemos',
            username: 'Lucas123',
            profile: 'DEV'
        }
        cy.get('#name').type(perfil.name)
        cy.get('#username').type(perfil.username)
        cy.get('#profile').type(perfil.profile)
        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', perfil.username)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile').find('button[title="Remover perfil"]').click()

        cy.contains('table tbody', perfil.username)
            .should('not.exist')


    })
    it.only('Deve remover um perfil', () => {
        const perfil = {
            name: 'Lucas Lemos',
            username: 'Lucas-Antonio-Lemos',
            profile: 'QA'
        }
        cy.get('#name').type(perfil.name)
        cy.get('#username').type(perfil.username)
        cy.get('#profile').type(perfil.profile)
        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', perfil.username)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile').find('a')
        .should('have.attr','href','https://github.com/'+perfil.username)



    })
})
