'use strict';

var request = require('supertest');
var async = require('async');
var agent;
var app;

describe('integration.auth.jwt', function() {

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    /**
     * Token test, a token must be injected with each request in order to be authenticated.
     * The token must follow the Authorization standard for JWT token.
     */
    describe('default', function(){

        it('should return 401 because of no token', function(done){
            async.parallel([
                function(cb){
                    request(app).get('/tests/auth/jwt').expect(401, cb);
                },
                function(cb){
                    request(app).get('/tests/auth/jwt').set('Authorization', 'JWT').expect(401, cb);
                }
            ], function(err){
               done();
            });
        });

        it('should return 401 because of invalid token', function(done){
            request(app).get('/tests/auth/jwt').set('Authorization', 'JWT 4qsd56q4sd5').expect(401, done);
        });

        it('should revoke the token because of timeout', function(done){
            // Change the expiration time of the token, so the token will be immediately obsolete.
            var token = sails.services.passport.generateToken({}, { expiresInSeconds: 1 });

            // Still good to auth
            request(app).get('/tests/auth/jwt').set('Authorization', 'JWT ' + token).expect(200, done);
            setTimeout(function(){

                // Not good anymore
                request(app).get('/tests/auth/jwt').set('Authorization', 'JWT ' + token).expect(401, done);
            }, 1000);
        });

        it('should return 200 thanks to good token', function(done){
            var token = '';
            request(app).get('/tests/auth/jwt').set('Authorization', 'JWT ' + token).expect(200, done);
        });

    });


});