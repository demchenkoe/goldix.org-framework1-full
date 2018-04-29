
module.exports.UsersController = ['factory', function(Controller, GraphQL, Rest) {
  
  class UsersController extends Controller {}
  
  Controller.meta(UsersController, {
    shortDesc: 'Users control',
    actions: [
      $injector.get('ActionUsersList'),
      $injector.get('ActionUserCreate'),
    ]
  });
  
  GraphQL.controller(UsersController, __dirname + '/users.graphqls');
  
  Rest.controller(UsersController, '/api/v1');
  
  return UsersController;
}];