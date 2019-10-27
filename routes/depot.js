'use strict';
var depot = require('../src/depot');
var User = require('../models/user');
var Depot = require('../models/depot');

var express = require('express');
var router = express.Router();

async function populateDepot(depot) {
    var depot = await Depot.findById(depot).populate('items.product').exec()
    return depot;
}

router.get('/:id', async function (req, res) {
    var user = await User.findById(req.params.id, function (err, docs) {
        return docs;
    });
    var depot = await populateDepot(user.depot)
    // var depot = await Depot.findById(user.depot, async function (err, docs) {
    //     var test = await docs.populate('items.Product')
    //     return test;
    // });
    console.log(depot)
    const data = {
        data: {
            title: "Depå",
            items: depot.items,
            balance: user.balance,
            name: user.name
        }
    };    
    res.json(data);
});

router.put('/buy',
    (req, res) => depot.buy(res, req.body));

router.put('/sell', 
    (req, res) => depot.sell(res, req.body));

router.put('/addmoney',
    (req, res) => depot.sell(res, req.body));

module.exports = router;