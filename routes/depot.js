'use strict';
var depot = require('../src/depot');
var User = require('../models/user');
var Depot = require('../models/depot');
const auth = require('../src/auth')

var express = require('express');
var router = express.Router();

async function populateDepot(depot) {
    var depot = await Depot.findById(depot).populate('items.product').exec()
    return depot;
}

router.get('/:id',
    (req, res, next) => auth.checkToken(req, res, next),
    async function (req, res) {
    var user = await User.findById(req.params.id, function (err, docs) {
        return docs;
    });
    var depot = await populateDepot(user.depot)
 
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
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => depot.buy(res, req.body));

router.put('/sell',
    (req, res, next) => auth.checkToken(req, res, next),    
    (req, res) => depot.sell(res, req.body));

router.put('/addmoney',
    (req, res, next) => auth.checkToken(req, res, next),
    (req, res) => depot.addMoney(res, req.body));

module.exports = router;