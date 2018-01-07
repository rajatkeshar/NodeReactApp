/*
 * @Description : Common library for sending emails
 * @Author : Sunil
 * @Version : 1.0
 */

var nodemailer = require('nodemailer');

// Create the transporter with the required configuration for Gmail

var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
});


module.exports = function() {

    return {
        sendEmail: function(email, subject, messBody, callback) {
            var mailOptions = {
                from: '"Rajat" <rajat.sunny2@gmail.com>',
                to: email,
                subject: subject,
                html: messBody
            };
            transporter.sendMail(mailOptions, function(error, info)  {
                var output = {};
                if (error) {
                    output.error = true;
                    output.msg = "Unable to Send Email";
                    output.data = error;
                    output.code = 9003;
                    return callback(output);
                }
                output.error = false;
                output.msg = "Email Send Successfully";
                output.data = info;
                output.code = 2000;
                return callback(output);
            });
        }
    };
};
