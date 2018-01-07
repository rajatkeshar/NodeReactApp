module.exports.controller = function(app, model, auth) {

    app.route('/').get(function(request, response) {
        model.test.test(request, response);
    });
};
