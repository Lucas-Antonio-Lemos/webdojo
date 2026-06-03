const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //defaultCommandTimeout: 10000, // configuração global TimeOut implícito ... não recomendável... 

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio:true,
    video:true
  },
});
