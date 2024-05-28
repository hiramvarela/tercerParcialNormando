describe('template spec', () => {
  it('La prueba deberá de validar que la ventana cuenta con el título de la aplicación así como los textos correspondientes', () => {
    cy.visit('http://localhost:8080/')
    cy.get('#Titulo').should('have.text',"¿Eres el mejor maestro pokemon del mundo?")
    cy.get('#Subtitulo').should('have.text',"Memoriza la mayor cantidad de Pokemons y demuestralo!!")
    cy.get('#Subtitulo1').should('have.text',"Equipo elegido para esta ronda:")

    cy.get('#Start').click()
    cy.get('#Instrucciones').should('have.text',"Instrucciones:")
    cy.get('#TextoInstrucciones').should('have.text',"Para enviar la secuencia de Pokemons da click en el Pokemon deseado, una vez que termines tu secuencia enviala dando click en la Pokebola")
    cy.get('#TextoInstrucciones1').should('have.text',"Si te equivocas no pasa nada, solo da click en el pokemon que quieras remover y este será eliminado de la secuencia")
  });
  it('La prueba deberá validar que aparezca un conjunto inicial de 6 Pokemons a la vista del usuario',()=>{
    cy.visit('http://localhost:8080/')
    cy.get('.Imagenes').should('have.length', 6);
  });
  it('La prueba deberá validar que exista el botón de jugar',()=>{
    cy.visit('http://localhost:8080/')
    cy.get('#Start').should('exist');
  });
})