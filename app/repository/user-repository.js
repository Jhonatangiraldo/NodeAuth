var User = require('./../model/user');

module.exports.createUser = function(newUser, callback, response){
	newUser.save(callback(response));
}

module.exports.findByUserAndPass = function(user, callback, response){
	return User.findOne({ "username": user.username }, 
						callback.bind({'response':response, 'user':user}));
}

