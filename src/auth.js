'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Depot = require('../models/depot');

require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const auth = {
    login: function (res, body) {
        const email = body.email;
        const password = body.password;

        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }
        User.findOne({ email: email }, function (err, userInfo) {
            if (err) {
                next(err)
            } else {
                bcrypt.compare(password, userInfo.password, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            errors: {
                                status: 500,
                                source: "/login",
                                title: "bcrypt error",
                                detail: "bcrypt error"
                            }
                        });
                    }
                    if (result) {
                        let payload = { email: userInfo.email };
                        let jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

                        return res.json({
                            data: {
                                type: "success",
                                message: "User logged in",
                                user: payload,
                                token: jwtToken,
                                userId: userInfo._id
                            }
                        });
                    }
                    return res.status(401).json({
                        errors: {
                            status: 401,
                            source: "/login",
                            title: "Wrong password",
                            detail: "Password is incorrect."
                        }
                    });
                })
            }
        })
    },

    register: function (res, body) {
        const email = body.email;
        const password = body.password;
        const birthday = body.birthday;
        const name = body.name;

        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/register",
                    title: "Email or password missing",
                    detail: "Email or password missing in request"
                }
            });
        }

        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/register",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }
            let depot = await new Depot();
            depot.save();
            var user = await User.create({
                email: email,
                name: name,
                password: hash,
                birthday: birthday,
                depot: depot,
                balance: 0
            },
                function (err, res) {
                    if (err) {
                        next(err);
                    }
                    return res;
                }
            )
            let payload = { email: email };
            let jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
            return res.status(201).json({
                data: {
                    type: "success",
                    message: "User registered",
                    user: payload,
                    token: jwtToken,
                    userId: user._id
                }
            });

        });
    },

    checkToken: function (req, res, next) {
        var token = req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, jwtSecret, function (err, decoded) {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: req.path,
                            title: "Failed authentication",
                            detail: err.message
                        }
                    });
                }

                req.user = {};
                req.user.email = decoded.email;

                next();

                return undefined;
            });
        } else {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: req.path,
                    title: "No token",
                    detail: "No token provided in request headers"
                }
            });
        }
    }
};

module.exports = auth;
