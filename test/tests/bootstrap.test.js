'use strict';

process.env.NODE_ENV = 'testing';

var path    = require('path');
var Sails   = require('sails');
var sails;

before(function(done) {

    Sails.lift({}, function(err, server) {
        if (err) return done(err);
        sails = server;
        done();
    });
});

after(function(done) {
    // here you can clear fixtures, etc.
    if(sails){
        sails.lower(done);
    }
    else{
        done();
    }
});
