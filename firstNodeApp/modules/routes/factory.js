var modelsPath = global.appDir + "/modules/routes/models/";

module.exports = {
    test: require(modelsPath + 'test')(),
    auth: require(modelsPath + 'auth')(),
    users: require(modelsPath + 'users')()
};
