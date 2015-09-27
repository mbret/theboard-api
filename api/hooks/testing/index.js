'use strict';

var path            = require('path');
var url             = require('url');
var passport        = require('passport');

module.exports = function (sails) {

    return {

        defaults: {
            testing: {
                activated: false
            },
        },

        configure: function(){

        },

        initialize: function (cb) {

            if(sails.config.testing.activated){
                //console.log(process.env);
                //console.log(sails.config.testing);

                this.routes = {
                    before: {

                        '/ping': function (req, res) {
                            return res.ok();
                        },

                        '/auth/basic': function(req, res){
                            require(path.join(process.cwd(), 'api/policies/basicAuth'))(req, res, function(err, a){
                                if(err){
                                    console.log(err);
                                    //next(err);
                                }
                                return res.ok();
                            });
                        }
                    }
                };
            }

            return cb();
        },

    };
};


