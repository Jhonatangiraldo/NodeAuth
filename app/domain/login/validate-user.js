var express     = require('express');
var app         = express();
var bcrypt = require('bcryptjs');
var config      = require('./../../../config/config');
var User = require('./../../model/user');
var userRepository = require('./../../repository/user-repository');

var jwt    = require('jsonwebtoken'); 

const failed = { 
    success: false, 
    message: 'Authentication failed. User not found.' 
};

const success = function (token) {
    return { 
        success: true,
        message: 'Enjoy your token!',
        token: token
    }
};

function validateUser(request, response) {
    var user = new User({
        username: request.body.username,
        password: request.body.password
    });
    userRepository.findByUserAndPass(user, handleResponse, response);
}

function handleResponse(error, result){
    let response = this.response;
    let user = this.user;
    if(error || !result || !result.password) {
        response.json(failed);
    } else {
        comparePasswords(user, result, response);
    }
};

function comparePasswords(user, resultQuery, response) {
    bcrypt.compare(user.password, resultQuery.password, 
                   resultComparePasswords.bind({'response':response, 'user':user}));
};

function resultComparePasswords(error, responseMatch) {
    let response = this.response;
    let user = this.user;
    if(responseMatch) {
        let token = jwt.sign(user, config.secret);
        response.json(success(token));
    } else {
        response.json(failed);
    } 
}

module.exports = validateUser;
