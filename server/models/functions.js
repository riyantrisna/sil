const jwt = require('jsonwebtoken');
const moment = require('moment');
const nodemailer = require('nodemailer');
const config = require('../config/config');

module.exports = {

    verifyToken(req, res, next){

        const bearerHeader = req.headers['authorization'];
    
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            
            jwt.verify(bearerToken, 'sil', (err, authData) => {
                if(err){
                    res.send({
                        status: '401',
                        message: 'authorization failed'
                    });
                }else{
                    next();
                }
            });
               
        }else{
            res.send({
                status: '401',
                message: 'authorization failed'
            });
        }
    
    },
    isEmpty(value){
        return (!value || value == undefined || value == "" || value.length == 0);
    },
    inArray(strs, arrays){
        for(var i in arrays) {
            if(arrays[i] == strs) return true;
        }
        return false;
    },
    datetimeFormats(value){
        return !this.isEmpty(value) ? moment(value).format('YYYY-MM-DD HH:mm:ss') : null;
    },
    sendEmail(to, subject, body){

        if(config.email.status){
            
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: config.email.host, //'smtp.ethereal.email',
                port: config.email.port, //587,
                secure: config.email.secure, //false, // true for 465, false for other ports
                auth: {
                    user: config.email.user, //account.user, // generated ethereal user
                    pass: config.email.password, //account.pass // generated ethereal password
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false
                }
            });

            let mailOptions = {
                from: '"'+ config.email.senderName +'" <'+ config.email.user +'>', // sender address
                to: to, // 'bar@example.com, baz@example.com', // list of receivers
                subject: subject, // Subject line
                text: '', // plain text body
                html: body, // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                
            });
        }
    }
};