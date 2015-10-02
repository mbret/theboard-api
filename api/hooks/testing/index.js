'use strict';

var path            = require('path');
var url             = require('url');
var passport        = require('passport');

module.exports = function (sails) {

    return {

        // Default configuration for this hook
        // This hook use config.testing namespace as configuration
        defaults: {
            testing: {
                activated: false // This hook should be activated intentionally (in /env/testing.js for example)
            },
        },

        configure: function(){

        },

        initialize: function (cb) {

            if(sails.config.testing.activated){

                // Add specific routes for testing
                this.routes = {
                    before: {

                        '/tests/ping': function (req, res) {
                            return res.ok();
                        },

                        '/tests/auth/basic': function(req, res){
                            require(path.join(process.cwd(), 'api/policies/basicAuth'))(req, res, function(err, a){
                                if(err){
                                    return res.serverError(err);
                                }
                                require(path.join(process.cwd(), 'api/policies/isAuth'))(req, res, function(err, a){
                                    if(err){
                                        return res.serverError(err);
                                    }
                                    return res.ok();
                                });
                            });
                        },

                        '/tests/auth/jwt': function(req, res){
                            require(path.join(process.cwd(), 'api/policies/jwtAuth'))(req, res, function(err, a){
                                if(err){
                                    return res.serverError(err);
                                }
                                require(path.join(process.cwd(), 'api/policies/isAuth'))(req, res, function(err, a){
                                    if(err){
                                        return res.serverError(err);
                                    }
                                    return res.ok();
                                });
                            });
                        },
                    }
                };
            }

            return cb();
        },

    };
};


