'use strict';

var request = require('supertest');
var async = require('async');
var should  = require('chai').should();
var expect  = require('chai').expect;
var agent;
var app;


describe('integration.controllers.user', function() {

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    //describe('register', function(){
    //
    //    it('should register new user', function(done){
    //        done(new Error('not implemented'));
    //    });
    //
    //    it('should not be able to register new user', function(done){
    //        done(new Error('not implemented'));
    //    });
    //});

});