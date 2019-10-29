var Product = require('../models/product');
var User = require('../models/user');
var Depot = require('../models/depot');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/trading');
Product.collection.drop();
User.collection.drop()
Depot.collection.drop();

var products = [
    new Product({
        imagePath: 'https://borsvarlden.com/wp-content/uploads/2018/06/bvfa-s-cryptocurrency-0002-960x540.jpg',
        title: 'BTHcoin',
        description: 'Cryptocurrency',
        rate: 1.002,
        variance: 0.6,
        startingPoint: 20
    }),
    new Product({
        imagePath: 'https://borsvarlden.com/wp-content/uploads/2018/06/bvfa-s-cryptocurrency-0002-960x540.jpg',
        title: 'JSgold',
        description: 'Ordinary gold',
        rate: 1.000,
        variance: 0.6,
        startingPoint: 40
    }),
    new Product({
        imagePath: 'https://borsvarlden.com/wp-content/uploads/2018/06/bvfa-s-cryptocurrency-0002-960x540.jpg',
        title: 'PHPsilver',
        description: 'Ordinary silver',
        rate: 1.000,
        variance: 0.6,
        startingPoint: 30
    }),
    new Product({
        imagePath: 'https://borsvarlden.com/wp-content/uploads/2018/06/bvfa-s-cryptocurrency-0002-960x540.jpg',
        title: 'Vlinux stock',
        description: 'Stock',
        rate: 1.000,
        variance: 0.6,
        startingPoint: 10
    }),
    new Product({
        imagePath: 'https://borsvarlden.com/wp-content/uploads/2018/06/bvfa-s-cryptocurrency-0002-960x540.jpg',
        title: 'Python stock',
        description: 'Stock',
        rate: 1.000,
        variance: 0.6,
        startingPoint: 10
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}