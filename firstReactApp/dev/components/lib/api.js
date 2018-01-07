import React from 'react';
import axios from 'axios';
var self = module.exports = {
    method: "GET",
    setMethod: function(method) {
        self.method = method;
        return self;
    },
    sendRequest: function(url, data, callback) {

        // REST request for remote image
        axios({
          method:self.method,
          url: "http://localhost:8081/" + url,
          responseType:'stream',
          data: data
        })
          .then(function(response) {
            callback(response.data);
        });
    }
};
