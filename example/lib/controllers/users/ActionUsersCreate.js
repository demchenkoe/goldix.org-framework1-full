module.exports.ActionUserCreate = ['factory', function (Action, GraphQL, Rest) {
  
  //Define action
  
  class ActionUserCreate extends Action {
    
    async process(params, context, options) {
      
      if(params.email === 'superadmin@example.com') {
        return Promise.reject('EMAIL_ALREADY_EXISTS');
      }
      
      let newUser = {
        id: 123,
        email: params.email,
        firstName: params.firstName,
        lastName: params.lastName,
      };
      //TODO: save to database
      
      return newUser;
    }
    
  }
  
  //Define meta information about action
  
  Action.meta(ActionUserCreate, {
    description: '',
    accessLevel: 'user',
    devStatus: 'mockup',
    params: {
      email: {
        Type: 'string',
        required: true,
        constraints: {    //@see validator.js
          email: true
        }
      },
      firstName: {
        Type: 'string',
        required: false,
      },
      lastName: {
        Type: 'string',
        required: false,
      }
    }
  });
  
  Action.error(ActionUserCreate, {
    hash: 'EMAIL_ALREADY_EXISTS',
    code: 2001,
    message: "test!"
  });
  
  //Define resolver for GraphQL API
  
  GraphQL.action(ActionUserCreate, {
    resolvers: {
      'Mutation.createUser': { executor: (context, root, args) => {
          const action = new context.Action({context});
          return action.exec(args.userFields, context);
      }
    }}
  });
  
  //Define handler for REST API
  //Full endpoint uri build as baseUri + endpoint uri. @see new Rest({ baseURI })
  
  Rest.action(ActionUserCreate, 'POST /users');
  
  return ActionUserCreate;
}];