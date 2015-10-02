'use strict';

var request = require('supertest');
var async = require('async');
var agent;
var app;

describe('integration.auth.jwt', function(){

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    /**
     * Token test, a token must be injected with each request in order to be authenticated.
     * The token must follow the Authorization standard for JWT token.
     */
    describe('default', function(){

        var user = {
            email: 'test@test.com',
            password: 'password',
        };
        var token = null;

        before(function(done){
            sails.models.user
                .register(user)
                .then(function(created){
                    user.id = created.id;
                    token = sails.services.passport.generateToken(created);
                    done();
                })
                .catch(done);
        });

        after(function(done){
            sails.models.user.destroy({}, done);
        });

        it('should return 401 because of no token', function(done){
            async.parallel([
                function(cb){
                    request(app).get('/tests/auth/jwt').expect(401, cb);
                },
                function(cb){
                    request(app).get('/tests/auth/jwt').set('Authorization', 'JWT').expect(401, cb);
                }
            ], function(err){
               done(err);
            });
        });

        it('should return 401 because of invalid token', function(done){
            request(app).get('/tests/auth/jwt').set('Authorization', 'JWT 4qsd56q4sd5').expect(401, done);
        });

        it('should return 200 thanks to good token', function(done){
            request(app).get('/tests/auth/jwt').set('Authorization', 'JWT ' + token)
                .expect(200, done);
        });

        it('should revoke the token because of timeout', function(done){
            // Change the expiration time of the token, so the token will be immediately obsolete.
            // 1 second is the minimum accepted
            var token = sails.services.passport.generateToken(user, { expiresInSeconds: 1 });

            async.parallel([
                // Still good to auth
                function(cb){
                    request(app).get('/tests/auth/jwt').set('Authorization', 'JWT ' + token).expect(200, cb);
                },
                // Not good anymore
                function(cb){
                    setTimeout(function(){
                        request(app).get('/tests/auth/jwt').set('Authorization', 'JWT ' + token).expect(401, cb);
                    }, 1000);
                }
            ], function(err){
                done(err);
            });
        });

    });


});