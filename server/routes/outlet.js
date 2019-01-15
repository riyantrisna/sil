const express = require('express');
const router = express.Router();
const config = require('../config/config');
const Outlet = require('../models/outlet');
const jwt = require('jsonwebtoken');
const Functions = require('../models/functions');

// USER - get list outlet from db
router.get('/outlet', Functions.verifyToken, function(req, res, next){
    Outlet.getOutletAll().then(function(outlet){

        res.send({
            status: '200',
            message: 'success',
            data: outlet
        });
    })
});

// USER - get detail outlet by filter id from db
router.get('/outletdetail/:id', Functions.verifyToken, function(req, res, next){
    var id = req.params.id;
    Outlet.getOutletDetail(id).then(function(outlet){

        if(!Functions.isEmpty(outlet)){
            res.send({
                status: '200',
                message: 'success',
                data: outlet
            });
        }else{
            res.send({
                status: '404',
                message: 'not found'
            });
        }
        
    });
});

// USER - get list outlet by filter name from db
router.get('/outlet/:search', Functions.verifyToken, function(req, res, next){
    var key = req.params.search;
    Outlet.getOutletFilter(key).then(function(outlet){

        res.send({
            status: '200',
            message: 'success',
            data: outlet
        });
    });
});

// USER - add a new outlet to db
router.post('/outlet', Functions.verifyToken, async function(req, res, next){

    var data = {
        outlet_company_id: req.body.company_id,
        outlet_name: req.body.name,
        outlet_email: req.body.email,
        outlet_address: req.body.address,
        outlet_gender: req.body.gender,
        outlet_phone: req.body.phone,
        outlet_last_login: req.body.last_login,
        outlet_lang: req.body.lang,
        outlet_status: req.body.status,
        outlet_role: req.body.role,
        outlet_type: req.body.type,
        outlet_outlet: req.body.outlet,
        insert_user_id: req.body.insert_outlet_id,
        insert_datetime: config.app.timezoneNow.format('YYYY-MM-DD HH:mm:ss'),
        update_user_id: null,
        update_datetime: null
    }
    
    try {
        await Outlet.insertOutlet(data);

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

// USER - update a outlet in db
router.put('/outlet/:id', Functions.verifyToken, async function(req, res, next){

    var data = {
        outlet_company_id: req.body.company_id,
        outlet_name: req.body.name,
        outlet_email: req.body.email,
        outlet_address: req.body.address,
        outlet_gender: req.body.gender,
        outlet_phone: req.body.phone,
        outlet_last_login: req.body.last_login,
        outlet_lang: req.body.lang,
        outlet_status: req.body.status,
        outlet_role: req.body.role,
        outlet_type: req.body.type,
        outlet_outlet: req.body.outlet,
        update_datetime: config.app.timezoneNow.format('YYYY-MM-DD HH:mm:ss'),
        update_user_id: req.body.update_outlet_id
    }
    
    try {
        await Outlet.updateOutlet(req.params.id, data);

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

// USER - delete a outlet from db
router.delete('/outlet/:id', Functions.verifyToken, async function(req, res, next){
    try {
        await Outlet.deleteOutlet(req.params.id);

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

// USER - get outlet by company id from db
router.get('/outletbycompanyid', Functions.verifyToken, async function(req, res, next){

    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    const decoded = await jwt.decode(bearer[1]);

    var id = decoded.user[0].user_company_id;

    Outlet.getOutletByCompanyId(id).then(function(outlet){

        if(!Functions.isEmpty(outlet)){
            res.send({
                status: '200',
                message: 'success',
                data: outlet
            });
        }else{
            res.send({
                status: '404',
                message: 'not found'
            });
        }
        
    });
});

module.exports = router;