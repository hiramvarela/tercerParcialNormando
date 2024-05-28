describe('template spec', () => {
  it('La  prueba  debe  de  validar  que  al  finalizar  el  juego  aparezca  el  número  de pokemons que el jugador memorizó ', () => {
    cy.visit('http://localhost:8080/')
    
    cy.intercept('POST', '/enviarSecuencia').as('enviarSecuencia')

    cy.get('#Start').click()
    cy.wait('@enviarSecuencia').then(({ response }) => {
      cy.get('#imagen').should('have.length', response.body.pokemonSequence.length)
      cy.get('#imagen').each((img, index) => {
        cy.wrap(img).should('have.attr', 'src', response.body.pokemonSequence[index].imagenUrl)
      })
      
      cy.wait(5000)
      
      // Obtener la lista de imágenes de los pokemones
      const pokemonImages = Cypress.$('.Imagenes img')

      // Obtener la imagen del pokemon correcto
      const correctPokemonIndex = response.body.pokemonSequence.findIndex(pokemon => pokemon.imagenUrl === response.body.pokemonSequence[0].imagenUrl)

      // Elegir un índice aleatorio diferente al del pokemon correcto
      let incorrectPokemonIndex = correctPokemonIndex
      while (incorrectPokemonIndex === correctPokemonIndex) {
        incorrectPokemonIndex = Math.floor(Math.random() * pokemonImages.length)
      }
      
      // Obtener la imagen del pokemon incorrecto
      const incorrectPokemonSrc = pokemonImages.eq(incorrectPokemonIndex).attr('src')

      cy.get(`img[src="${incorrectPokemonSrc}"]`).click()
      cy.get('.secuencia-a-enviar img').should('have.attr', 'src', incorrectPokemonSrc)

      cy.get("#jugar").click()
      cy.wait('@enviarSecuencia').then(({ request }) => {
        const secuenciaEnviada = request.body.pokemons;
        const secuenciaActual = response.body.pokemonSequence.map(pokemon => pokemon.identificador);

        expect(secuenciaEnviada).to.not.deep.equal(secuenciaActual);

        cy.get('#game-over').should('have.text','GAME OVER');
        cy.get('#puntaje').should('exist');
      })
    })
  })
})
