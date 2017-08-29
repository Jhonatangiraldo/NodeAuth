var jwt = require('jsonwebtoken');
var config = require('./../../config/config');

const noTokenProvided = { 
      success: false, 
      message: 'No token provided.' 
};

const failedToAuthenticate = { 
      success: false, 
      message: 'Failed to authenticate token.' 
};

function verify(request, response, next) {
    if (verifyAuthenticate(request)) {
        next();
        return;
    }

    var token = request.body.token || request.query.token || request.headers['access_token'];
    if (token) {
        verifyToken(token, request, response, next);
    } else {
        return response.status(403).send(noTokenProvided);
    }
};

function verifyAuthenticate(request) {
    return request.path === '/authenticate' && request.method === 'POST';
}

function verifyToken(token, request, response, next) {
  jwt.verify(token, config.secret, function(error, decoded) {      
      if (error) {
          return response.json(failedToAuthenticate);    
      } else {
          request.decoded = decoded;    
          next();
      }
  });
}

module.exports = verify;