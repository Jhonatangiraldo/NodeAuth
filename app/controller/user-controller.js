var User = require('./../model/user');
var userRepository = require('./../repository/user-repository');
var createUser = require('./../domain/user/create-user');

var createUserController = function(request, response) {
    return createUser(request, response);
};

module.exports.createUser = createUserController;