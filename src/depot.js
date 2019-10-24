'use strict';
var Depot = require('../models/depot');
var User = require('../models/user');
var Product = require('../models/product');

const depot = {
    buy: function (req) {
        var depot = await Depot.findById(req.body.depot_id, function (err, docs) {
            return docs;
        });
        var user = await User.findById(req.body.user_id, function (err, docs) {
            return docs;
        });
        var product = await Product.findById(req.body.product_id, function (err, docs) {
            return docs;
        });
        var amount = req.body.amount;

        depot.items.forEach(element => {
            if (element.product._id === product._id) {
                element.amount += amount;
                user.balance -= req.body.price * amount;
                depot.save();
                user.save();
                return res.status(201).json({
                    data: "bought"
                });
            }
        });
        var boughtProduct = {
            product: product,
            amount: amount
        };

        depot.items.push(boughtProduct);
        depot.save();
        user.balance -= req.body.price * amount;
        user.save();

        return res.status(201).json({
            data: "bought"
        });
    },
    sell: function (req) {
        var depot = await Depot.findById(req.body.depot_id, function (err, docs) {
            return docs;
        });
        var user = await User.findById(req.body.user_id, function (err, docs) {
            return docs;
        });
        var product = await Product.findById(req.body.product_id, function (err, docs) {
            return docs;
        });
        var amount = req.body.amount;
        var msg = "";
        var status = 200;
        depot.items.forEach(element => {
            if (element.product._id === product._id) {
                if (element.amount > amount) {
                    element.amount -= amount;
                    user.balance += req.body.price * amount;
                    depot.save();
                    user.save();
                    return res.status(201).json({
                        data: "sold"
                    });
                } else if (element.amount === amount) {
                    var index = depot.items.indexOf(element);
                    if (index > -1) {
                        depot.items.splice(index, 1);
                        user.balance += req.body.price * amount;
                        depot.save();
                        user.save();
                        return res.status(201).json({
                            data: "sold"
                        });
                    } else {
                        status = 500;
                        msg = "Okänd orsak :("
                    }
                } else {
                    status = 500;
                    msg = "För få produkter!";
                }
            } else {
                status = 500;
                msg = "Du äger inte produkten!";
            }
        });

        return res.status(status).json({
            errors: {
                status: status,
                detail: msg
            }
        });
    }
}

module.exports = depot;
