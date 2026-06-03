describe('Deve solicitar consultoria', () => {

    beforeEach(() => {


    })

    it('Deve solicitar consultoria Individual', () => {

        cy.login()
        cy.goTo('Formulários', 'Consultoria')

        //  => Interagindo com o campo de texto. 
        cy.get('input[placeholder="Digite seu nome completo"]').type('Lucas Lemos')
        cy.get('#email').type('lucas@email.com')
        cy.get('input[placeholder="(00) 00000-0000"]').type('5132323232')
            .should('have.value', '(51) 3232-3232')// TAG HTML, ATRIBUTO E VALOR. 

        // => Interagindo com caixa de opção... 
        // cy.get('#consultancyType').select('In Company') ...com id é fácil... 
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')

        // botões de rádio
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        //=>Interagindo com campo CPF
        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('11111111111')
            .should('have.value', '111.111.111-11')

        //=> Interagindo com o checkbox

        const channels = ['Instagram', 'LinkedIn', 'Udemy', 'YouTube', 'Indicação de Amigo']
        channels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()

        })
        //Interagindo com o campo que faz upload de arquivos
        cy.get('input[type="file"]').should('exist')
            .selectFile('./cypress/fixtures/cnh.jpeg', { force: true })

        //=>TextArea : 
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Testando textArea...')

        //=> Interagindo com o campo Tecnologias...

        const techs=['Cypress','JS','html','css','sql']
        techs.forEach((tech)=>{

            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')
    
    
            cy.contains('label', 'Tecnologias')
                .parent()
            cy.contains('span', tech)
                .should('be.visible')
        })
        cy.contains('span','Li e aceito os').should('be.visible')
        .parent()
        .find('input')
        .click()

               cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', { timeout: 8000 }).should('be.visible')
            .find('.modal-content').should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.').should('be.visible')



    })

})