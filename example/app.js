
//Include framework and load own modules

// const {builder} = require('@goldix.org/framework1-full');
const {builder} = require('../index');

builder.findModuleAndLoad([
  __dirname + '/lib/**/*.js',
// '/add/other/path/here/**/*.js',
]);

//Your main entry point of application with available dependency injections

function run(httpServer) {
  httpServer.listen();
}

//Run immediately if this module not included by other modules.
//If you want run for unit tests, you can run it manual

if (!module.parent) {
  builder.invoke(run, null, {});
}

//Export for unit tests and other...

module.exports.run = run;
module.exports.builder = builder;