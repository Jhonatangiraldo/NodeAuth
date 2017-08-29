var express     = require('express');
var app         = express();
var User = require('./../model/user');
var userRepository = require('./../repository/user-repository');

const userNotCreated = function(error) { 
     return {
         success: false, 
         message: 'User not created',
         error: error
     }
};

const userCreated = { 
     success: true, 
     message: 'User created' 
};

var createUser = function(request, response) {
    var newUser = retrieveUser(request);
    userRepository.createUser(newUser, handleResponse, response);
};

function retrieveUser(request) {
    var newUser = new User({
        username: "username",
        password: "password"
    });
    return newUser;
}

function handleResponse(response, error){
    if(error) {
        response.json(userNotCreated(error));
    } else {
        response.json(userCreated);
    }
};

module.exports = createUser;