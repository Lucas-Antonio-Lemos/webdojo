describe('Validações de Alertas em JS', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })
    it('Deve validar a mensagem de alerta', () => {
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!')
        })
        //cy.on é um listner
        cy.contains('button', 'Mostrar Alert').click()

    })
    it('Deve confirmar um diálogo e validar a resposta positiva', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return true;//True simula o click no botão ok 

        })
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você clicou em Ok!')
        })
        cy.contains('button', 'Mostrar Confirm').click()
    })
    it('Deve cancelar um diálogo e validar a resposta negativa', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperte um botão!')
            return false;//False simula o click no botão cancelar

        })
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
        })
        cy.contains('button', 'Mostrar Confirm').click()
    })
    it('Deve interagir com um prompt, inserir texto e validar msg',()=>{
        cy.window().then((win)=>{
            cy.stub(win,'prompt').returns('Lucas')
        })
            cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá Lucas! Boas-vindas ao WebDojo!')
        })
        cy.contains('button','Mostrar Prompt').click()

    })
})
//cy.window acessa a janela do navegador
//cy.stub simula o prompt