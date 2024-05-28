describe('template spec', () => {
  it('La  prueba  deberá  interceptar  la  llamada  realizada  por  el  botón  Jugar  y  asegurarse que la respuesta regresada sea renderizada en la sección de "secuencia  Máquina”', () => {
    cy.visit('http://localhost:8080/')
    cy.intercept('POST', '/enviarSecuencia').as('enviarSecuencia')
    cy.get('#Start').click()
    cy.wait('@enviarSecuencia').then(({response}) => {
    
      cy.get('#imagen').should('have.length', response.body.pokemonSequence.length);
      cy.get('#imagen').each((img, index) => {
        cy.wrap(img).should('have.attr', 'src', response.body.pokemonSequence[index].imagenUrl);
      });
    })
  });
  it('La  prueba  deberá  validar  que  la  secuencia  sea  reemplazada  después  de  5 segundos  por  el  Pokemon  Ditto  solo  para  que  el  usuario  recuerde  cuantos Pokemons existían en la secuencia', () => {
    cy.visit('http://localhost:8080/')
    cy.intercept('POST', '/enviarSecuencia').as('enviarSecuencia')
    cy.get('#Start').click()
    cy.wait('@enviarSecuencia').then(({response}) => {
      cy.wait(5000)
      cy.get('#imagen').should('have.length', response.body.pokemonSequence.length);
      cy.get('#imagen').each((img) => {
        
        cy.wrap(img).should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png');
      });
    })
  })
})