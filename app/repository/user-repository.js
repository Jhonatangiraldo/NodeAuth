module.exports.createUser = function(newUser, callback, response){
	newUser.save(callback(response));
}