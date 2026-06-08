Cypress.Commands.add('fillConsultancyForm', (form) => {
    //  => Interagindo com o campo de texto. 
    cy.get('input[placeholder="Digite seu nome completo"]').type(form.name)
    cy.get('#email').type(form.email)
    cy.get('input[placeholder="(00) 00000-0000"]').type(form.phone)
    // .should('have.value', '(51) 3232-3232')// TAG HTML, ATRIBUTO E VALOR. 


    // => Interagindo com caixa de opção... 
    // cy.get('#consultancyType').select('In Company') ...com id é fácil... 
    cy.contains('label', 'Tipo de Consultoria')
        .parent()
        .find('select')
        .select(form.consultancyType)


    // botões de rádio

    if (form.personType === 'cpf') {

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
            .type(form.document)
        // .should('have.value', '111.111.111-11')
    }
    if (form.personType === 'cnpj') {

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')
        //=>Interagindo com campo CNPJ
        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(form.document)
        // .should('have.value', '111.111.111-11')

    }




    //=> Interagindo com o checkbox


    form.channels.forEach((channel) => {
        cy.contains('label', channel)
            .find('input')
            .check()

    })



    //Interagindo com o campo que faz upload de arquivos
    cy.get('input[type="file"]').should('exist')
        .selectFile(form.file, { force: true })

    //=>TextArea : 
    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)

    //=> Interagindo com o campo Tecnologias...


    form.techs.forEach((tech) => {

        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech)
            .type('{enter}')


        cy.contains('label', 'Tecnologias')
            .parent()
        cy.contains('span', tech)
            .should('be.visible')
    })
    if (form.terms === true) {

        cy.contains('label', 'termos de uso').should('be.visible')

            .find('input')
            .click()
    }


})
Cypress.Commands.add('submitt', () => {
    cy.contains('button', 'Enviar formulário')
        .click()

})
Cypress.Commands.add('validateModal', () => {

    cy.get('.modal', { timeout: 8000 }).should('be.visible')
        .find('.modal-content').should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.').should('be.visible')
})
Cypress.Commands.add('validateRequiredFields', () => {


    cy.contains('button', 'Enviar formulário')
        .click()

    const fields = [
        { label: 'Nome Completo', msg: 'Campo obrigatório' },
        { label: 'Email', msg: 'Campo obrigatório' },
        { label: 'termos de uso', msg: 'Você precisa aceitar os termos de uso' }
    ]

    fields.forEach(({ label, msg }) => {
        cy.contains('label', label)
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', msg)
    })




})
