const {Action, Controller, Validator, ValidationErrors, CompositeType, Type} = require('@goldix.org/actions');
const {Express, Rest, ErrorParser,  bodyParser, cookieParser} = require('@goldix.org/http');

let definitions = {
  utils: ['value', require('@goldix.org/utils')],
  TraceID: ['value', require('@goldix.org/trace-id').TraceID],
  Action: ['value', Action],
  Controller: ['value', Controller],
  Validator: ['value', Validator],
  ValidationErrors: ['value', ValidationErrors],
  CompositeType: ['value', CompositeType],
  Type: ['value', Type],
  Express: ['value', Express],
  Rest: ['value', Rest],
  ErrorParser: ['value', ErrorParser],
  bodyParser: ['value',  bodyParser],
  cookieParser: ['value', cookieParser],
  GraphQL: ['value', require('@goldix.org/graphql').GraphQL],
  
  logger: ['factory', function (config) {
    
    const {Loggers} = require('@goldix.org/loggers');
    const {LoggerWinstonConsole} = require('@goldix.org/logger-winston-console');
    const {LoggerWinstonElastic} = require('@goldix.org/logger-winston-elastic');
    
    Loggers.define('LoggerWinstonConsole', LoggerWinstonConsole);
    Loggers.define('LoggerWinstonElastic', LoggerWinstonElastic);
    
    return new Loggers(config.loggers);
  }],
};


const config = require('config');
const {Builder} = require('@goldix.org/di');
const builder = (new Builder({config, definitions}));

module.exports = {definitions, config, builder, Builder};