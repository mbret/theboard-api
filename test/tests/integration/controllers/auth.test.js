'use strict';

var request = require('supertest');
var async = require('async');
var should  = require('chai').should();
var expect  = require('chai').expect;
var agent;
var app;

/**
 * The local authentication method is only available for signing route.
 * The purpose is to get back a token in order to authenticate through api then.
 */
describe('integration.controllers.auth', function() {

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    describe('login', function(){

        var user = {
            email: 'test@test.com',
            password: 'password',
        };

        before(function(done) {
            sails.models.user
                .register(user)
                .then(function(){
                    done();
                })
                .catch(done);
        });

        after(function(done){
            sails.models.user.destroy(user, done);
        });

        it('should return 400 (Invalid credentials)', function(done){
            async.parallel([
                function(cb){
                    request(app).post('/auth/signin').send({email: 'foo', password: 'bar'})
                        .expect(400, cb);
                }
            ], function(err){
                done(err);
            });
        });

        it('should return 200 thanks to good credentials on classic route', function(done){
            request(app).post('/auth/signin').send(user)
                .expect(200, done);
        });
    });

    describe('register', function(){

        var user = {
            email: 'test@test.com',
            password: 'password',
        };

        after(function(done){
            sails.models.user.destroy(user, done);
        });

        it('should register account', function(done){
            request(app).post('/auth/signup')
                .send(user)
                .expect(201)
                .expect(function(res){
                    res.body.should.not.be.empty;
                    res.body.should.have.property('user');
                    res.body.user.should.be.a('object');
                    res.body.user.should.have.property('id');
                    res.body.should.have.property('token');
                    res.body.token.should.be.a('string');
                })
                .end(function(err, res){
                    if(err) done(err);
                    var id = res.body.user.id;
                    sails.models.user.findOne(id)
                        .then(function(user){
                            expect(user).to.not.be.empty;
                            done();
                        })
                        .catch(done);
                });
        });

    });

});