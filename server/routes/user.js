const express = require('express');
const router = express.Router();
const config = require('../config/config');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const Functions = require('../models/functions');
const randomstring = require("randomstring");

// USER - get list user from db
router.get('/user', Functions.verifyToken, function(req, res, next){
    User.getUserAll().then(function(user){

        res.send({
            status: '200',
            message: 'success',
            data: user
        });
    })
});

// USER - get detail user by filter id from db
router.get('/userdetail/:id', Functions.verifyToken, function(req, res, next){
    var id = req.params.id;
    User.getUserDetail(id).then(function(user){

        if(!Functions.isEmpty(user)){
            res.send({
                status: '200',
                message: 'success',
                data: user
            });
        }else{
            res.send({
                status: '404',
                message: 'not found'
            });
        }
        
    });
});

// USER - get list user by filter name from db
router.get('/user/:search', Functions.verifyToken, function(req, res, next){
    var key = req.params.search;
    User.getUserFilter(key).then(function(user){

        res.send({
            status: '200',
            message: 'success',
            data: user
        });
    });
});

// USER - add a new user to db
router.post('/user', Functions.verifyToken, async function(req, res, next){

    var data = {
        user_company_id: req.body.company_id,
        user_name: req.body.name,
        user_email: req.body.email,
        user_password: md5(req.body.password),
        user_address: req.body.address,
        user_gender: req.body.gender,
        user_phone: req.body.phone,
        user_last_login: req.body.last_login,
        user_lang: req.body.lang,
        user_status: req.body.status,
        user_role: req.body.role,
        user_type: req.body.type,
        user_outlet: req.body.outlet,
        insert_user_id: req.body.insert_user_id,
        insert_datetime: config.app.timezoneNow.format('YYYY-MM-DD HH:mm:ss'),
        update_user_id: null,
        update_datetime: null
    }
    
    try {
        await User.insertUser(data);

        await res.send({
            status: '201',
            message: 'success',
            data: data
        });

    } catch (error) {
        await res.send({
            status: '500',
            message: 'failed ' + error
        });
    }

});

// USER - update a user in db
router.put('/user/:id', Functions.verifyToken, async function(req, res, next){

    var data = {
        user_company_id: req.body.company_id,
        user_name: req.body.name,
        user_email: req.body.email,
        user_password: md5(req.body.password),
        user_address: req.body.address,
        user_gender: req.body.gender,
        user_phone: req.body.phone,
        user_last_login: req.body.last_login,
        user_lang: req.body.lang,
        user_status: req.body.status,
        user_role: req.body.role,
        user_type: req.body.type,
        user_outlet: req.body.outlet,
        update_datetime: config.app.timezoneNow.format('YYYY-MM-DD HH:mm:ss'),
        update_user_id: req.body.update_user_id
    }
    
    try {
        await User.updateUser(req.params.id, data);

        await res.send({
            status: '201',
            message: 'success',
            data: data
        });

    } catch (error) {
        await res.send({
            status: '500',
            message: 'failed ' + error
        });
    }
});

// USER - delete a user from db
router.delete('/user/:id', Functions.verifyToken, async function(req, res, next){
    try {
        await User.deleteUser(req.params.id);

        await res.send({
            status: '201',
            message: 'success'
        });

    } catch (error) {
        await res.send({
            status: '500',
            message: 'failed ' + error
        });
    }
});

//login
router.post('/login', function(req, res, next){

    var email = req.body.email;
    var password = md5(req.body.password);

    User.getUserLogin(email, password).then(function(user){
        if(typeof user !== 'undefined' && user.length > 0){

            User.updateUserLastLogin(email, {user_last_login: config.app.timezoneNow.format('YYYY-MM-DD HH:mm:ss')});

            jwt.sign({user}, 'sil', { expiresIn: '24H'}, function(err, token){
                res.json({
                    status: '200',
                    message: 'sukses',
                    token: token,
                    lang: user[0].user_lang
                });
            });
            
        }else{
            res.json({
                status: '401',
                message: 'failed'
            });
        }
    });
    
});

//cek sesssion login
router.post('/logincheck', function(req, res, next){

    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        
        jwt.verify(bearerToken, 'sil', (err, authData) => {
            if(err){
                res.send({
                    status: '401',
                    message: 'failed',
                    token: bearerHeader
                });
            }else{
                res.send({
                    status: '200',
                    message: 'success',
                    token: bearerHeader
                });
            }
        });
           
    }else{
        res.send({
            status: '401',
            message: 'failed',
            token: bearerHeader
        });
    }
    
});

// USER - update password a user in db
router.post('/user/forgotpassword', async function(req, res, next){

    var user = await User.getUserEmail(req.body.email);


    if(!Functions.isEmpty(user)){
        
        try {
            var newPassword = await randomstring.generate(9);

            //send email
            var body = 'Password baru anda '+ newPassword;
            await Functions.sendEmail(req.body.email, 'Lupa Password', body);
           
            // update password
            var data = {
                user_password: md5(newPassword),
                update_datetime: config.app.timezoneNow.format('YYYY-MM-DD HH:mm:ss'),
                update_user_id: user.user_id
            }
            await User.updatePasswordUserByEmail(req.body.email, data);

            await res.send({
                status: '201',
                message: 'success'
            });

        } catch (error) {
            await res.send({
                status: '500',
                message: 'failed'
            });
        }
    

    }else{
        res.send({
            status: '404',
            message: 'failed'
        });
    }
});

module.exports = router;