describe('Kanban Board', () => {
    it('Deve mover tarefa de Todo para Done', () => {
        cy.login()
        cy.contains('Kanban').click()
        cy.contains('Kanban Board').should('be.visible')

        const dataTransfer = new DataTransfer()
        cy.contains('div[draggable=true]', 'Documentar API')
            .trigger('dragstart', { dataTransfer })

        cy.get('.column-done')
            .trigger('drop', { dataTransfer })
            .find('h3')
            .should('have.text', 'Done (4)')

        cy.get('.column-done')
            .should('include.text', 'Documentar API')
            .and('include.text', 'Criar documentação da API com Swagger')




    })
})