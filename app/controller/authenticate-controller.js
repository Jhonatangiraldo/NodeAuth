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

function verify(req, res, next) {
    if (verifyAuthenticate(req, next)) {
        next();
        return;
    }

    var token = req.body.token || req.query.token || req.headers['access_token'];
    if (token) {
        verifyToken(token, req, res, next);
    } else {
        return res.status(403).send(noTokenProvided);
    }
};

function verifyAuthenticate(req, next) {
    return req.path === '/authenticate' && req.method === 'POST';
}

function verifyToken(token, req, res, next) {
  jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
          return res.json(failedToAuthenticate);    
      } else {
          req.decoded = decoded;    
          next();
      }
  });
}

module.exports = verify;