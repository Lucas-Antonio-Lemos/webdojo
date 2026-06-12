
import { dataFormatada } from '../support/utils'
describe('Coockies', () => {
    
    beforeEach(() => {

    })
    it('Deve validar os cookies', () => {
        cy.login()
        cy.get('[data-cy="user-name"]').should('be.visible')
            .and('have.text', 'Fernando Papito')//verificação // validação do nome do usuário logado

        cy.get('[data-cy="welcome-message"]').should('be.visible')
            .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

        cy.getCookie('login_date').should('exist')
        cy.getCookie('login_date').should((coockie) => {
            expect(coockie.value).to.eq(dataFormatada)
        })

// .should((cookie) => { ... })   
// Esse segundo bloco usa uma função de callback para inspecionar o conteúdo do cookie retornado.

// expect(cookie.value).to.eq(dataFormatada)  
// O valor do cookie (cookie.value) é comparado com a variável dataFormatada.
// Se forem iguais, o teste passa; se não, o teste falha.

cy.window().then((win)=>{
    const token=win.localStorage.getItem('token')
    expect(token).to.match(/^[a-fA-F0-9]{32}$/)
})
//serve para você acessar diretamente o objeto window da aplicação que está sendo testada — ou seja, o mesmo window que existe no navegador quando você abre a página.


    })
})