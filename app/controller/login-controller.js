var validateUser = require('./../domain/login/validate-user');

function login(request, response) {
    return validateUser(request, response);
}

module.exports.login = login;