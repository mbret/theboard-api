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

        it('should return 400 (Invalid credentials)', function(done){
            async.parallel([
                function(cb){
                    request(app).post('/auth/signin').send({email: 'sdfsdf', password: 'sdfsdf'})
                        .expect(400, cb);
                }
            ], function(err){
                done(err);
            });
        });

        //it('should return 200 thanks to good credentials on classic route', function(done){
        //    request(app).post('/auth/signin').send({email: sails.config.test.user.email, password: sails.config.test.userPassword})
        //        .expect(200, done);
        //});
    });

});