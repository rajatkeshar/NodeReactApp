module.exports.controller = function(app, model, auth) {

    app.post('/login', function(request, response) {
		model.auth.login(request, response);
	});

	app.post('/forgetPassword', function(request, response) {
		model.auth.forgetPassword(request, response);
	});

	app.put('/confirmPassword/:resetPasswordToken', function(request, response) {
		model.auth.confirmPassword(request, response);
	});

	app.post('/logout', function(request, response) {
		model.auth.logout(request, response);
	});
};
