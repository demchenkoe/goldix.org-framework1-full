
module.exports.httpServer = ['factory', function (config, logger, Express, GraphQL, Rest, OpenApi, bodyParser) {
  
  let httpServer = new Express({
    ...config.http,
    logger
  });
  
  //GraphQL API

  if(config.graphql) {
    
    const graphQL = new GraphQL({
      id: config.graphql.id,             //some id or name of GraphQL instance
      endpoint: config.graphql.endpoint, //as '/graphql',
      logger,
      controllers: [
        $injector.get('UsersController')
      ]
    });
    
    graphQL.bind(httpServer);
    graphQL.bindUI(httpServer);           //bind GraphiQL interface (@see https://github.com/graphql/graphiql)
    
  }
  
  //Rest API
 
  if(config.rest) {
    
    const rest = new Rest({
      id: config.rest.id,                 //some id or name of Rest instance
      baseUri: config.rest.baseUri,       //as '/api/v1'
      middleware: bodyParser.json(),
      logger,
      controllers: [
        $injector.get('UsersController')
      ]
    });
    
    rest.bind(httpServer);
  }
  
  //OpenAPI generator @see https://swagger.io/docs/
  
  const _package = require('../../package.json');
  const  openapi = new OpenApi({
    expressInstance: httpServer,
    info: {
      title: _package.name,
      version: _package.version,
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
    contact: {
      name: 'API Support',
      url: 'http://www.example.com/support',
      email: 'support@example.com',
    },
    servers: [
      { url: 'http://127.0.0.1:3057', description: 'local'}
    ],
  });
  httpServer.app.get('/api/help.json', (request, response) => {
    response.json(openapi.toJSON())
  });
  
  return httpServer;
}];