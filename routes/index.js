'use strict';
var Product = require('../models/product');

var express = require('express');
var router = express.Router();

router.get('/', async function (req, res) {
    var products = await Product.find(function (err, docs) {
        return docs;
    });
    const data = {
        data: {
            title: "Traiding platform",
            products: products
        }
    };

    res.json(data);
});

module.exports = router;
