'use strict';
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);
var user = {
    email: "test@example.com",
    password: "123test",
    name: "Test",
    birthday: "2000-10-10"
};
let token = "";
let userId = "";

describe('depot', () => {
    describe('PUT /depot/addMoney', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/register")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    token = res.body.data.token;
                    userId = res.body.data.userId;
                    done();
                });
        });
        it('should get 200 HAPPY PATH', (done) => {
            let data = {
                money: 1000,
                user_id: userId
            }
            chai.request(server)
                .put("/depot/addmoney")
                .set('x-access-token', token)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });
    });
    describe('PUT /depot/buy', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    token = res.body.data.token;
                    userId = res.body.data.userId;
                    done();
                });
        });
        it('should get 200 HAPPY PATH', (done) => {
            let data = {
                money: 1000,
                user_id: userId
            }
            chai.request(server)
                .put("/depot/addmoney")
                .set('x-access-token', token)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        });
        it('should get 201 HAPPY PATH', (done) => {
            let data = {
                amount: 1,
                user_id: userId,
                product_id: "5daf503b5c169e1012badc86",
                price: 10
            }
            chai.request(server)
                .put("/depot/buy")
                .set('x-access-token', token)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                })
        });
        it('should get 500 HAPPY PATH', (done) => {
            let data = {
                amount: 1,
                user_id: userId,
                product_id: "5daf503b5c169e1012badc86",
                price: 10000000000
            }
            chai.request(server)
                .put("/depot/buy")
                .set('x-access-token', token)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        });
    });
    describe('PUT /depot/sell', () => {
        it('should get 200 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/login")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    token = res.body.data.token;
                    userId = res.body.data.userId;
                    done();
                });
        });
        it('should get 503 HAPPY PATH', (done) => {
            let data = {
                amount: 1,
                user_id: userId,
                product_id: "123123",
                price: 10
            }
            chai.request(server)
                .put("/depot/sell")
                .set('x-access-token', token)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(503);
                    done();
                })
        });
    });
});
