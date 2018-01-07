var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UsersSchema  = new Schema({
	username: {
		type: String,
		index: true,
		required: true,
		unique: true
		},
	name: {
		type: String,
		required: true
		},
	email: {
		type: String,
		required: true,
		unique: true
		},
	password: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	}
});

//UsersSchema.index({ email: 1, username: 1 }, { unique: true });

var Users = module.exports = mongoose.model('Users', UsersSchema);

module.exports.createUser = function(newUser, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
			//if(err){ throw err };
			callback(null, isMatch);
	});
};

module.exports.getUserByUsername = function(username, callback) {
	var query = {username: username};
	Users.findOne(query, callback);
};

module.exports.getUserByEmailId = function(email, callback) {
	var query = {email: email};
	Users.findOne(query, callback);
};

module.exports.getUserByUserId = function(userId, callback) {
	var query = {_id: userId};
	Users.findOne(query, callback);
};

module.exports.getUserByResetPasswordToken = function(resetPasswordToken, callback) {
	var query = {resetPasswordToken: resetPasswordToken, resetPasswordExpires: { $gt: Date.now() }};
	Users.findOne(query, callback);
};

module.exports.updateUserPasswordByResetPasswordToken = function(resetPasswordToken, password, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(password, salt, function(err, hash) {
			var query = {resetPasswordToken: resetPasswordToken};
			var update = {$set: {password: hash, resetPasswordToken: undefined, resetPasswordExpires: undefined}};
			Users.update(query, update, callback);
		});
	});
};

module.exports.resetPasswordToken = function(callback) {
	crypto.randomBytes(20, function(err, buf) {
    	var token = buf.toString('hex');
        callback(err, token);
    });
};
