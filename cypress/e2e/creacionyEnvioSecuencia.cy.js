describe('template spec', () => {
  it('La prueba debe de validar que al dar click en un Pokemon este sea añadido a la secuencia', () => {
    cy.visit('http://localhost:8080/')

    cy.intercept('POST', '/enviarSecuencia').as('enviarSecuencia')

    cy.get('#Start').click()

    cy.wait('@enviarSecuencia').then(({ response }) => {
      cy.get('#imagen').should('have.length', response.body.pokemonSequence.length)
      cy.get('#imagen').each((img, index) => {
        cy.wrap(img).should('have.attr', 'src', response.body.pokemonSequence[index].imagenUrl)
      })
      cy.wait(5000)
      const firstPokemonSrc = response.body.pokemonSequence[0].imagenUrl;
      cy.get(`img[src="${firstPokemonSrc}"]`).first().click()

      cy.get('.secuencia-a-enviar img').should('have.attr', 'src', firstPokemonSrc)
    })
  });
  it('La prueba debe de validar que al dar click en un Pokemon de la secuencia este sea removido', () => {
    cy.visit('http://localhost:8080/')

    cy.intercept('POST', '/enviarSecuencia').as('enviarSecuencia')

    cy.get('#Start').click()

    cy.wait('@enviarSecuencia').then(({ response }) => {
      cy.get('#imagen').should('have.length', response.body.pokemonSequence.length)
      cy.get('#imagen').each((img, index) => {
        cy.wrap(img).should('have.attr', 'src', response.body.pokemonSequence[index].imagenUrl)
      })
      cy.wait(5000)
      const firstPokemonSrc = response.body.pokemonSequence[0].imagenUrl;
      cy.get(`img[src="${firstPokemonSrc}"]`).first().click()

      cy.get('.secuencia-a-enviar img').should('have.attr', 'src', firstPokemonSrc)
      cy.wait(4000)
      cy.get('.secuencia-a-enviar img').click();



      cy.get('#imagen').should('have.attr', 'src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png');
    })
  });
  it('La prueba debe validar que el botón de "Enviar Secuencia" aparezca hasta que la cantidad de Pokemons dentro de la secuencia a memorizar y la secuencia a enviar sean iguales.', () => {
    cy.visit('http://localhost:8080/')

    cy.intercept('POST', '/enviarSecuencia').as('enviarSecuencia')

    cy.get('#Start').click()
    cy.wait('@enviarSecuencia').then(({ response }) => {
      cy.get('#imagen').should('have.length', response.body.pokemonSequence.length)
      cy.get('#imagen').each((img, index) => {
        cy.wrap(img).should('have.attr', 'src', response.body.pokemonSequence[index].imagenUrl)
      })
      cy.wait(5000)
      const firstPokemonSrc = response.body.pokemonSequence[0].imagenUrl;
      cy.get(`img[src="${firstPokemonSrc}"]`).first().click()

      cy.get('.secuencia-a-enviar img').should('have.attr', 'src', firstPokemonSrc)

      cy.get("#jugar").should("exist")
    })
  });
  it('La prueba debe validar que el botón de "Enviar Secuencia" aparezca hasta que la cantidad de Pokemons dentro de la secuencia a memorizar y la secuencia a enviar sean iguales.', () => {
    cy.visit('http://localhost:8080/')

    cy.intercept('POST', '/enviarSecuencia').as('enviarSecuencia')

    cy.get('#Start').click()
    cy.wait('@enviarSecuencia').then(({ response }) => {
      cy.get('#imagen').should('have.length', response.body.pokemonSequence.length)
      cy.get('#imagen').each((img, index) => {
        cy.wrap(img).should('have.attr', 'src', response.body.pokemonSequence[index].imagenUrl)
      })
      cy.wait(5000)
      const firstPokemonSrc = response.body.pokemonSequence[0].imagenUrl;
      cy.get(`img[src="${firstPokemonSrc}"]`).first().click()

      cy.get('.secuencia-a-enviar img').should('have.attr', 'src', firstPokemonSrc)

      cy.get("#jugar").click()
      cy.wait('@enviarSecuencia').then(({ request }) => {
        const secuenciaEnviada = request.body.pokemons;
        const secuenciaActual = response.body.pokemonSequence.map(pokemon => pokemon.identificador);

        expect(secuenciaEnviada).to.deep.equal(secuenciaActual);
      })
    })
  })
})
