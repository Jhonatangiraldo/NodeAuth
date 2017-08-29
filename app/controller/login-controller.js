var validateUser = require('./../domain/login/validate-user');

const itsLogged = { "success": true, "logged": true };

function login(request, response) {
    return validateUser(request, response);
}

function logged(request, response) {
    //because if request arrive here, the token has been provided
    return response.json(itsLogged);
}

module.exports.login = login;
module.exports .logged = logged;