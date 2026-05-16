describe('Formulário de Consultoria ', () => {
    it('Deve solicitar consultoria individual', () => {
        cy.start()
        cy.submitLogin('papito@webdojo.com', 'katana123')
        /*  cy.contains('h4','Formulários')sem id o TEXTO é a melhor maneira para cheagr no elemento. .parent() vai para o elemento PAI do elemento h4... .parent().parent()*/
        cy.goTo('Formulários', 'Consultoria')


        //  => Interagindo com o campo de texto. 
        cy.get('input[placeholder="Digite seu nome completo"]').type('Lucas Antonio') // => Se não tiver id, localizador  com tag html, atributo com valor funciona bem 
        cy.get('#email').type('lucas@email.com')
        cy.get('input[placeholder="(00) 00000-0000"]').type('51 32323232').should('have.value', '(51) 3232-3232')// TAG HTML, ATRIBUTO E VALOR. 


        //    // => Interagindo com caixa de opção... 
        // cy.get('#consultancyType').select('In Company') ...com id é fácil... 
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')

        //=> Interagindo com botões de rádio... 
        //span[text()="Pessoa Física"] = Xpath ... 
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click().should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        // =>Interagindo com o campo CPF
        //cy.get('#document') com id é fácil ... 
        cy.contains('label', 'CPF')
            .parent()
            .find('input').type('000 000 000 00')
            .should('have.value', '000.000.000-00')

        // => Interagindo com CheckBox... 
        const channels = ['Instagram', 'LinkedIn', 'YouTube', 'Udemy', 'Indicação de Amigo']

        channels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check().should('be.checked')


        })

        // Interagindo com  elemento que faz upload de arquivo
        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/cnh.jpeg', { force: true })

        // Interagindo com  TextArea...
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]').type('sasasa')

        // =>Interagindo com o campo Tecnologias.

        const techs = ['Cypress', 'JS']
        techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')//simulou o pressionamento da tecla enter.

            cy.contains('label', 'Tecnologias')
                .parent()
            cy.contains('span', tech)
                .should('be.visible')

                //Submissão do Formulário
                cy.contains('label','termos de uso').should('be.visible')
                .parent()
                .find('input')
                .check()

                 cy.contains('button','Enviar formulário')
                   .click({ force: true })


                // cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
                // .should('be.visible')
                
                
                
                

        })
        
    })
    //VERIFICAÇÃO DOS CAMPOS OBRIGATÓRIOS
    it.only('VERIFICAÇÃO dos campos OBRIGATÓRIOS',()=>{
              cy.start()
        cy.submitLogin('papito@webdojo.com', 'katana123')
        /*  cy.contains('h4','Formulários')sem id o TEXTO é a melhor maneira para cheagr no elemento. .parent() vai para o elemento PAI do elemento h4... .parent().parent()*/
        cy.goTo('Formulários', 'Consultoria')

              cy.contains('button','Enviar formulário')
                   .click({ force: true })
                cy.contains('p','Digite nome e sobrenome').should('be.visible')
                cy.contains('p','Informe um email válido').should('be.visible')
                cy.contains('p','Você precisa aceitar os termos de uso').should('be.visible')


                



    })
    
})

































