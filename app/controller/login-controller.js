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

function login(req, res) {
    if (req.body.name != "juan") {
       res.json(failed);
       return;
    }
    
    var user = {"name":"juan", "username":"username"};
    var token = jwt.sign(user, config.secret);

    res.json(success(token));
}

module.exports = login;