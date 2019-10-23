'use strict';
var Depot = require('../models/depot');
var User = require('../models/user');
var Product = require('../models/product');

var express = require('express');
var router = express.Router();

router.get('/:id', async function (req, res) {
    var depot = await Depot.findById(req.params.id, function (err, docs) {
        return docs;
    });
    const data = {
        data: {
            title: "Depå",
            items: depot.items
        }
    };

    res.json(data);
});

router.post('/buy', async function (req, res) {
    var depot = await Depot.findById(req.body.depot_id, function (err, docs) {
        return docs;
    });
    var user = await User.findById(req.body.user_id, function (err, docs) {
        return docs;
    });
    var product = await Product.findById(req.body.product_id, function (err, docs) {
        return docs;
    });
    
    

    res.json(data);
});

module.exports = router;