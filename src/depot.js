'use strict';
var User = require('../models/user');
var Product = require('../models/product');
var Depot = require('../models/depot')

const depot = {
    buy: async function (res, body) {
        var user = await User.findById(body.user_id, function (err, docs) {
            return docs;
        });
        var depotId = user.depot;
        var depot = await Depot.findById(depotId, function (err, docs) {
            return docs;
        });
        var product = await Product.findById(body.product_id, function (err, docs) {
            return docs;
        });
        var amount = body.amount;

        if (body.price * amount > user.balance) {
            return res.status(500).json({
                status: 500,
                data: "Not enough money"
            });
        }
        var boughtProduct = {
            product: product,
            amount: amount,
            boughtPrice: body.price
        };

        
        
        depot.items.push(boughtProduct);
        depot.save();
        user.balance -= body.price * amount;
        user.save();

        return res.status(201).json({
            status: 201,
            data: "bought"
        });
    },
    sell: async function (res, body) {
        var user = await User.findById(body.user_id, function (err, docs) {
            return docs;
        });
        var depotId = user.depot;
        var depot = await Depot.findById(depotId, function (err, docs) {
            return docs;
        });
        var amount = body.amount;
        var msg = "";
        var status = 200;
        depot.items.forEach(element => {
            if (element._id == body.product_id) {
                if (element.amount > amount) {
                    element.amount -= amount;
                    user.balance += body.price * amount;
                    depot.save();
                    user.save();
                    status = 201;
                    msg = "sold";
                } else if (element.amount === amount) {
                    var index = depot.items.indexOf(element);
                    if (index > -1) {
                        depot.items.splice(index, 1);
                        user.balance += body.price * amount;
                        depot.save();
                        user.save();
                        status = 201;
                        msg = "sold";
                    } else {
                        status = 501;
                        msg = "Okänd orsak :("
                    }
                } else {
                    status = 502;
                    msg = "För få produkter!";
                }
            } else {
                status = 503;
                msg = "Du äger inte produkten!";
            }
        });
       

        return res.status(status).json({
            data: {
                status: status,
                detail: msg
            }
        });
    },
    addMoney: async function (res, body) {
        var user = await User.findById(body.user_id, function (err, docs) {
            return docs;
        });
        var money = body.money;
        var msg = "Added money";
        var status = 200;

        user.balance += money;
        user.save();

        return res.status(status).json({
            data: {
                status: status,
                detail: msg
            }
        });
    }
}

module.exports = depot;
