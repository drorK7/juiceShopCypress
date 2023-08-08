const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://juice-shop.herokuapp.com/',
    testIsolation: false,
    specPattern: "cypress/integration/*/*.cy.js",
    supportFile: "cypress/support/commands.js"
  },
})


 
