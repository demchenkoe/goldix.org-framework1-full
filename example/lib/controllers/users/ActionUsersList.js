module.exports.ActionUsersList = ['factory', function (Action, GraphQL, Rest) {
  
  //Define action
  
  class ActionUsersList extends Action {
    
    async process(params, context, options) {
      return [{
        id: 123,
        email: "john@example.com",
        firstName: "John",
        lastName: "Doe",
      }];
    }
    
  }
  
  //Define meta information about action
  
  Action.meta(ActionUsersList, {
    description: '',
    accessLevel: 'user',
    devStatus: 'mockup',
    params: {
      searchText: {
        Type: 'string',
        required: false,
      },
      limit: {
        Type: 'number',
        defaultValue: 50,
      },
      offset: {
        Type: 'number',
        defaultValue: 0,
      }
    }
  });
  
  //Define resolver for GraphQL API
  
  GraphQL.action(ActionUsersList, 'Query.users');
  
  //Define handler for REST API
  //Full endpoint uri build as baseUri + endpoint uri. @see new Rest({ baseURI })
  
  Rest.action(ActionUsersList, 'GET /users?searchText=&limit=&offset=');
  
  return ActionUsersList;
}];