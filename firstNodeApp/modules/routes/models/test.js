module.exports = function() {

    return {
        test: function(request, response) {

            response.json({
    			error: false,
    			code: 2000,
    			msg: "Hey This Is My First Response From Node Server",
    			data: "yoyo"
    		});
        }
    };
};
