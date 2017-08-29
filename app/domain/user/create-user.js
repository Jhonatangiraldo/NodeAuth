var express     = require('express');
var app         = express();
var bcrypt = require('bcryptjs');
const saltRounds = 10;
var User = require('./../../model/user');
var userRepository = require('./../../repository/user-repository');

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
    hashPassword(request).then((passwordHashed) => {
        var newUser = retrieveUser(request, passwordHashed);
        userRepository.createUser(newUser, handleResponse, response);
    });
};

function hashPassword(request) {
    return bcrypt.hash(request.body.password, saltRounds);
}

function retrieveUser(request, password) {
    var newUser = new User({
        username: request.body.username,
        password: password
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