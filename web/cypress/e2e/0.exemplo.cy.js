describe('Login', () => {// Serve para agrupar um conjunto de testes automatizados.
  it('Deve Logar com sucesso', () => {//Função que implementa um teste automatizado

    cy.viewport(1440, 900)//Ajusta o tamanho da janela do navegador para 1440x900 pixels. Isso garante que o teste simule a aplicação em uma tela grande (como desktop).

    cy.visit('http://localhost:3000')//Abre a aplicação que está rodando localmente na porta 3000. É o ponto de entrada do teste.

    cy.get('#email').type('papito@webdojo.com')//-  Localiza o campo com id="email" e  type= digita o texto "papito@webdojo.com". Isso simula o usuário preenchendo o e-mail.

    //cy.get é um comando que busca elementos da DOM usando o seletor informado

    //type é comando que deve ser encadeado a um elemento obtido com cy.get, ele simula a digitação de texto dentro de um campo de input ou textarea.

    cy.get('#password').type('katana123')


    //XPath = //button[text()='Entrar'] 
    cy.contains('button', 'Entrar').click() //procura um elemento do tipo button com o texto ' Entar'
    /*- O primeiro argumento ('button') restringe a busca apenas a elementos desse tipo.
- O segundo argumento ('Entrar') é o texto que deve aparecer dentro do botão.
*/
    //O comando contains para localizar elementos pelo texto visível. Isso é bem útil quando você não tem um id ou class confiável
    // cy.wait(3000)

    cy.get('[data-cy="user-name"]') //cy.get  busca o elemento que tem como atributo personalizado  [data-cy="user-name"]
      .should('be.visible') //verifica se está visível ' renderizado na página' 
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')


  })


  it('Não deve logar com senha inválida',()=>{

  cy.viewport(1440,900)

  cy.visit('http://localhost:3000')

  cy.get('#email').type('papito@webdojo.com')
  

  cy.get('#password').type('kksaksa')

  
  cy.contains('button','Entrar').click()
 

 cy.contains('Acesso negado! Tente novamente.')
 .should('be.visible')
 


})

it('Não deve logar com email inválido',()=>{
    cy.viewport(1440,900)

  cy.visit('http://localhost:3000')

  cy.get('#email').type('papit@webdojo.com')
  cy.get('#password').type('katana123')
  cy.contains('button','Entrar').click()

   cy.contains('Acesso negado! Tente novamente.')
 .should('be.visible')
 


})
})







