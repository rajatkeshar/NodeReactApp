var jwt = require('jsonwebtoken');
var fs = require('fs');

module.exports = function() {

    var user = {
        userName: "test",
        email: "test@test.com"
    };

    this.isAuthorized = function(request) {
        return( request.headers && request.headers.userId)? true: false;
    };

    this.parseRequestToken = function(request) {
        if (request.headers && request.headers.token) {
            try {
                var token = request.headers.token;
                var publickey = fs.readFileSync('publickey.pem');
                /*jwt.verify(token, publickey, { algorithms: 'RS256' }, function (err, payload) {
                  // if token alg != RS256,  err == invalid signature
                  request.headers.userId = (payload && payload.userId)? payload.userId: null;
                  console.log(request.headers.userId);
				  console.log("err", err);
                  //request.headers.authToken = token;
                  var data = {"err": err, "output": payload};
                  return data;
                });*/
				var decode = jwt.verify(token, publickey);
				request.headers.userId = (decode.userId)? decode.userId: null;
            } catch (e) {
                return false;
            }
        }
        return false;
    };

    this.authorize = function(request, output) {
        var result = {};
        if(output && output._id && output.email) {
            var privatekey = fs.readFileSync('privatekey.pem');

            var token = jwt.sign({"userId": output._id, "username": output.username}, privatekey, {
                algorithm: 'RS256',
                expiresIn: 60 * 60
            });

            result.msg = "Logged in successfully";
            result.code =2000;
            result.userInfo = {
                "name": output.name,
                "userId": output._id,
                "email": output.email,
                "username": output.username,
                "data": {
                    "token": token
                }
            };
            return result;
        } else {
            output.success = false;
            output.code = 4100;
            output.msg = "Login error";
            output.data = "";
            return output;
        }
    };
    return this;
};
