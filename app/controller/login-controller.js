var express     = require('express');
var app         = express();
var config      = require('./../../config/config');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

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

function login(request, response) {
    if (request.body.name != "juan") {
       response.json(failed);
       return;
    }
    
    var user = {"name":"juan", "username":"username"};
    var token = jwt.sign(user, config.secret);

    response.json(success(token));
}

module.exports = login;