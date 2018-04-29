
module.exports.httpServer = ['factory', function (config, logger, Express, GraphQL, Rest, bodyParser) {
  
  let httpServer = new Express({
    ...config.http,
    logger
  });

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
  
  return httpServer;
}];