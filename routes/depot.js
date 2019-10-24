'use strict';
var depot = require('../src/depot');

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

router.put('/buy',
    (req, res) => depot.buy(res, req));

router.post('/sell', 
    (req, res) => depot.sell(res, req));

module.exports = router;