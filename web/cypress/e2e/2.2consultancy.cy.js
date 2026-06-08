import consultancy from '../fixtures/consultancy.json'// importando de forma global... não precisa mais do this = USANDO NO 2E IT 
import {personal,company} from '../fixtures/consultancy.json'// desestruturando = USANDO NO 3 E IT ... 
describe('Deve solicitar consultoria', () => {

    beforeEach(() => {
        cy.login()//usando helper em commands... 
        cy.goTo('Formulários', 'Consultoria')
        cy.fixture('consultancy').as('consultancyData') // IMPORTANDO DE FIXTURES ... 


    })

    it('Deve solicitar consultoria Individual : USANDO FIXTURES COM FUNÇÃO TRADICIONAL', function () {
        // const data = {  
        //     name: "Lucas Antonio",
        //     email: "lucas@email.com",
        //     phone: "51 3232 3232",
        //     consultancyType: "Individual",
        //     personType: "cpf",
        //     document: "000 000 000 00",
        //     channels: ["Instagram", "LinkedIn", "YouTube", "Udemy", "Indicação de Amigo"],
        //     file: "./cypress/fixtures/cnh.jpeg",
        //     description: "Testando TextArea",
        //     techs: ["Cypress", "html", "js", "css"],
        //     terms: true
        // }
        const data = this.consultancyData.personal // THIS NÃO FUNCIONA EM ARROW FUNCTION

        //  => Interagindo com o campo de texto. 
        cy.get('input[placeholder="Digite seu nome completo"]').type(data.name)
        cy.get('#email').type(data.email)
        cy.get('input[placeholder="(00) 00000-0000"]').type(data.phone)
        // .should('have.value', '(51) 3232-3232')// TAG HTML, ATRIBUTO E VALOR. 


        // => Interagindo com caixa de opção... 
        // cy.get('#consultancyType').select('In Company') ...com id é fácil... 
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(data.consultancyType)


        // botões de rádio

        if (data.personType === 'cpf') {

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }
        if (data.personType === 'cnpj') {

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }


        //=>Interagindo com campo CPF
        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(data.document)
        // .should('have.value', '111.111.111-11')

        //=> Interagindo com o checkbox


        data.channels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()

        })



        //Interagindo com o campo que faz upload de arquivos
        cy.get('input[type="file"]').should('exist')
            .selectFile(data.file, { force: true })

        //=>TextArea : 
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(data.description)

        //=> Interagindo com o campo Tecnologias...


        data.techs.forEach((tech) => {

            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')


            cy.contains('label', 'Tecnologias')
                .parent()
            cy.contains('span', tech)
                .should('be.visible')
        })
        if (data.terms === true) {

            cy.contains('label', 'termos de uso').should('be.visible')

                .find('input')
                .click()
        }

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', { timeout: 8000 }).should('be.visible')
            .find('.modal-content').should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.').should('be.visible')



    })
    it('Deve solicitar consultoria In Company : IMPORTANDO GLOBALMENTE , NÃO PRECISA DO THIS E USANDO ARROW FUNCTION', () => {

const data=consultancy.company

        //  => Interagindo com o campo de texto. 
        cy.get('input[placeholder="Digite seu nome completo"]').type(data.name)
        cy.get('#email').type(data.email)
        cy.get('input[placeholder="(00) 00000-0000"]').type(data.phone)
            //.should('have.value', '(51) 3232-3232')// TAG HTML, ATRIBUTO E VALOR. 

        // => Interagindo com caixa de opção... 
        // cy.get('#consultancyType').select('In Company') ...com id é fácil... 
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('In Company')

        // botões de rádio
        cy.contains('label', 'Jurídica')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')

        //=>Interagindo com campo CPF
        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type('19835883000188')
        // .should('have.value', '111.111.111-11')

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

        const techs = ['Cypress', 'JS', 'html', 'css', 'sql']
        techs.forEach((tech) => {

            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')


            cy.contains('label', 'Tecnologias')
                .parent()
            cy.contains('span', tech)
                .should('be.visible')
        })
        cy.contains('span', 'Li e aceito os').should('be.visible')
            .parent()
            .find('input')
            .click()

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', { timeout: 8000 }).should('be.visible')
            .find('.modal-content').should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.').should('be.visible')



    })
    it('VERIFICAÇÃO dos campos OBRIGATÓRIOS', () => {

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(personal.description) //  DESESTRUTURADO... 

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



      it.only('Deve solicitar consultoria Individual :IMPORTANDO GLOBALMENTE E USANDO DESTRUTURAÇÃO',  ()=> {
    

        //  => Interagindo com o campo de texto. 
        cy.get('input[placeholder="Digite seu nome completo"]').type(personal.name)
        cy.get('#email').type(personal.email)
        cy.get('input[placeholder="(00) 00000-0000"]').type(personal.phone)
        // .should('have.value', '(51) 3232-3232')// TAG HTML, ATRIBUTO E VALOR. 


        // => Interagindo com caixa de opção... 
        // cy.get('#consultancyType').select('In Company') ...com id é fácil... 
        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(personal.consultancyType)


        // botões de rádio

        if (personal.personType === 'cpf') {

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }
        if (personal.personType === 'cnpj') {

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }


        //=>Interagindo com campo CPF
        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(personal.document)
        // .should('have.value', '111.111.111-11')

        //=> Interagindo com o checkbox


        personal.channels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()

        })



        //Interagindo com o campo que faz upload de arquivos
        cy.get('input[type="file"]').should('exist')
            .selectFile(personal.file, { force: true })

        //=>TextArea : 
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(personal.description)

        //=> Interagindo com o campo Tecnologias...


        personal.techs.forEach((tech) => {

            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')


            cy.contains('label', 'Tecnologias')
                .parent()
            cy.contains('span', tech)
                .should('be.visible')
        })
        if (personal.terms === true) {

            cy.contains('label', 'termos de uso').should('be.visible')

                .find('input')
                .click()
        }

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', { timeout: 8000 }).should('be.visible')
            .find('.modal-content').should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.').should('be.visible')



    })
 

})
