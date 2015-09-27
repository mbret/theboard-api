'use strict';

process.env.NODE_ENV = 'testing';

// Ensure we're in the project directory, so relative paths work as expected
// no matter where we actually lift from.
process.chdir(__dirname + '/../..');

global.LIB_DIR = process.cwd() + '/lib';

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
