

module.exports = {
  http: {
    id: 'HTTP Server',
    host: '127.0.0.1',
    port: 3005,
  },
  graphql: {
    id: 'api.v1.graphql',
    endpoint: '/graphql'
  },
  rest: {
    id: 'api.v1.rest',
    baseUri: '/api/v1'    //without slash on end!
  },
  loggers: {
    pools: {
      default: {
        LoggerWinstonElastic: {
          enabled: false,
          //@see https://github.com/vanthome/winston-elasticsearch
          level: 'info',
          indexPrefix: 'biz',
          clientOpts: {
            //@see https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html
            host: process.env.LOGGER_ELASTICKSEARCH_URI || null //for example, 'http://localhost:9200'
          }
        },
        LoggerWinstonConsole: {
          enabled: true,
          //@see https://github.com/winstonjs/winston/blob/master/docs/transports.md#console-transport
          level: 'info',
          colorize: true,
          timestamp: true,
          //json: true,
          prettyPrint: true
        }
      }
    }
  }
};