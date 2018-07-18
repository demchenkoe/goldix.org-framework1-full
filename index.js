const {Action, ActionError, Controller, Validator, ValidationErrors, CompositeType, Type} = require('@goldix.org/actions');
const {Express, Rest, OpenApi, ErrorParser,  express, bodyParser, cookieParser} = require('@goldix.org/http');
const {GraphQL, paginationExtension, typesExtension} = require('@goldix.org/graphql');
GraphQL.extensions = {
  pagination: paginationExtension,
  types: typesExtension
};

let definitions = {
  utils: ['value', require('@goldix.org/utils')],
  TraceID: ['value', require('@goldix.org/trace-id').TraceID],
  Action: ['value', Action],
  ActionError: ['value', ActionError],
  Controller: ['value', Controller],
  Validator: ['value', Validator],
  ValidationErrors: ['value', ValidationErrors],
  CompositeType: ['value', CompositeType],
  Type: ['value', Type],
  express: ['value', express],
  Express: ['value', Express],
  Rest: ['value', Rest],
  OpenApi: ['value', OpenApi],
  ErrorParser: ['value', ErrorParser],
  bodyParser: ['value',  bodyParser],
  cookieParser: ['value', cookieParser],
  GraphQL: ['value', GraphQL],
  
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