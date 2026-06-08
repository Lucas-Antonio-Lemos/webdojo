import { personal, company } from '../fixtures/consultancy.json'

describe('Deve solicitar consultoria', () => {

    beforeEach(() => {
 
        cy.login()//usando helper em commands... 
        cy.goTo('Formulários', 'Consultoria')

    })

    it('Consultoria Individual', () => {// tudo encapsulado em consultancyActions
        cy.fillConsultancyForm(personal) 
        cy.submitt()
        cy.validateModal()




    })
    it('Consultoria In Company', () => {
        cy.fillConsultancyForm(company)
        cy.submitt()
        cy.validateModal()



    })
    it.only('VERIFICAÇÃO dos campos OBRIGATÓRIOS', () => {
        cy.validateRequiredFields()
        
    })










})


