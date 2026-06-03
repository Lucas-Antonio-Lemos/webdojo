describe('Formulário de Consultoria ', () => {
    it('Deve solicitar consultoria individual', () => {
        cy.login()//helper
        /*  cy.contains('h4','Formulários')sem id o TEXTO é a melhor maneira para cheagr no elemento. .parent() vai para o elemento PAI do elemento h4... .parent().parent()*/
        cy.goTo('Formulários', 'Consultoria')




    })
})






























