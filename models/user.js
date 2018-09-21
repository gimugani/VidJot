var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	date: {
		type: Date, 
		default: Date.now
	}
});

var options = {
	usernameField : 'email',
	errorMessages: {
		UserExistsError : 'Email Already Registered'	
	}
}

UserSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("User", UserSchema); 