const { defineConfig } = require('cypress')
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  projectId: 'qck1iw',
  defaultCommandTimeout: 6000,
  env: {
    url: 'https://rahulshettyacademy.com',
    username: 'Srimalee',
    password: 'Test123',
  },
  retries: {
    runMode: 1,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
    //  return require('./cypress/plugins/index.js')(on, config)
    on('file:preprocessor', cucumber())
  },
    specPattern: 'cypress/integration/**/*.{js,jsx,ts,tsx}',
  },
})
