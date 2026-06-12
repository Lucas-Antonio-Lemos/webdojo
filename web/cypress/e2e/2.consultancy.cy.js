import consultancyData from '../fixtures/consultancy.json' // importando
Cypress.Commands.add('fillConsultancyForm', (form) => {

})
describe('Formulário de Consultoria ', () => {
    beforeEach(() => {
        cy.login()//usando HELPER  em Commands
        /*  cy.contains('h4','Formulários')sem id o TEXTO é a melhor maneira para cheagr no elemento. .parent() vai para o elemento PAI do elemento h4... .parent().parent()*/
        cy.goTo('Formulários', 'Consultoria')
        cy.fixture('consultancy').as('consultancyData')
    })
    it('Deve solicitar consultoria individual', function () {
        const consultancyForm = this.consultancyData.personal  //USANDO FIXTURES ... 


        //  => Interagindo com o campo de texto. 
        cy.get('input[placeholder="Digite seu nome completo"]').type(consultancyForm.name) // => Se não tiver id, localizador  com tag html, atributo com valor funciona bem 
        cy.get('#email').type(consultancyForm.email)
        cy.get('input[placeholder="(00) 00000-0000"]').type(consultancyForm.phone)
        //.should('have.value', '(51) 3232-3232')// TAG HTML, ATRIBUTO E VALOR. 


        //    // => Interagindo com caixa de opção... 
        // cy.get('#consultancyType').select('In Company') ...com id é fácil... 
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(consultancyForm.consultancyType)

        //=> Interagindo com botões de rádio... 
        //span[text()="Pessoa Física"] = Xpath ... 

        if (consultancyForm.personType === 'cpf') {

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .click().should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }

        if (consultancyForm.personType === 'cnpj') {

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .click().should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }

        // =>Interagindo com o campo CPF
        //cy.get('#document') com id é fácil ... 
        cy.contains('label', 'CPF')
            .parent()
            .find('input').type(consultancyForm.document)
        // .should('have.value', '000.000.000-00')

        // => Interagindo com CheckBox... 


        consultancyForm.channels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check().should('be.checked')


        })

        // Interagindo com  elemento que faz upload de arquivo
        cy.get('input[type="file"]')
            .selectFile(consultancyForm.file, { force: true })

        // Interagindo com  TextArea...
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]').type(consultancyForm.description)

        // =>Interagindo com o campo Tecnologias.

        consultancyForm.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')//simulou o pressionamento da tecla enter.


            cy.contains('label', 'Tecnologias')
                .parent()
            cy.contains('span', tech)
                .should('be.visible')
        })

        //Submissão do Formulário
        if (consultancyForm.terms === true) {

            cy.contains('label', 'termos de uso').should('be.visible')
                .parent()
                .find('input')
                .check()
        }

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', { timeout: 8000 }).should('be.visible')
            .find('.modal-content').should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.').should('be.visible')

    })



    //IN COMPANY
    it('Deve solicitar consultoria In Company', () => {


        const consultancyForm = consultancyData.company //  foi importado globalmente não precisa usar fixture



        //  => Interagindo com o campo de texto. 
        cy.get('input[placeholder="Digite seu nome completo"]').type(consultancyForm.name) // => Se não tiver id, localizador  com tag html, atributo com valor funciona bem 
        cy.get('#email').type(consultancyForm.email)
        cy.get('input[placeholder="(00) 00000-0000"]').type(consultancyForm.phone)
        //.should('have.value', '(51) 3232-3232')// TAG HTML, ATRIBUTO E VALOR. 


        //    // => Interagindo com caixa de opção... 
        // cy.get('#consultancyType').select('In Company') ...com id é fácil... 
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(consultancyForm.consultancyType)


        //=> Interagindo com botões de rádio... 
        //span[text()="Pessoa Física"] = Xpath ... 

        if (consultancyForm.personType === 'cpf') {

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .click().should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }

        if (consultancyForm.personType === 'cnpj') {

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .click().should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }

        // =>Interagindo com o campo CPF/CNPJ
        //cy.get('#document') com id é fácil ... 
        cy.contains('label', 'CNPJ')
            .parent()
            .find('input').type(consultancyForm.document)
        // .should('have.value', '000.000.000-00')

        // => Interagindo com CheckBox... 


        consultancyForm.channels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check().should('be.checked')


        })

        // Interagindo com  elemento que faz upload de arquivo
        cy.get('input[type="file"]')
            .selectFile(consultancyForm.file, { force: true })

        // Interagindo com  TextArea...
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]').type(consultancyForm.description)

        // =>Interagindo com o campo Tecnologias.

        consultancyForm.techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')//simulou o pressionamento da tecla enter.


            cy.contains('label', 'Tecnologias')
                .parent()
            cy.contains('span', tech)
                .should('be.visible')
        })

        //Submissão do Formulário
        if (consultancyForm.terms === true) {

            cy.contains('label', 'termos de uso').should('be.visible')
                .parent()
                .find('input')
                .check()
        }

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', { timeout: 8000 }).should('be.visible')
            .find('.modal-content').should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.').should('be.visible')

    })





    //VERIFICAÇÃO DOS CAMPOS OBRIGATÓRIOS
    it('VERIFICAÇÃO dos campos OBRIGATÓRIOS', () => {


        cy.contains('button', 'Enviar formulário')
            .click()

        cy.contains('label', 'Nome Completo *')
            .parent()
            .find('p').should('be.visible')

        cy.contains('label', 'Email *')
            .parent()
            .find('p').should('be.visible')


        cy.contains('span', 'Li e aceito os')
            .parent()
            .parent()
            .find('p')
            .should('be.visible')







    })

    afterEach(() => {
        cy.log(`Acontece depois de cada teste`)
    })

})









































