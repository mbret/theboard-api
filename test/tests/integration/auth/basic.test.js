var request = require('supertest');
var helper  = require(TEST_LIB_DIR + '/helper');
var async = require('async');
var app;

describe('integration.auth.basic', function() {

    before(function(done) {
        app = sails.hooks.http.app;
        done();
    });

    after(function(done) {
        done();
    });

    /**
     * Basic authentication
     * - The client provide email/password for each request
     */
    describe('basicAuth', function(){

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
            sails.models.user.destroy({}, done);
        });

        it('should return 401 because no Auth provided', function(done){
            async.parallel([
                function(cb){
                    request(app).get('/tests/auth/basic').set('Authorization', '').expect(401, cb);
                },
                function(cb){
                    request(app).get('/tests/auth/basic').set('Authorization', 'Basic ').expect(401, cb);
                }
            ], function(err){
                done();
            });
        });

        it('should return 401 (bad request)', function(done){
            request(app).get('/tests/auth/basic').set('Authorization', 'Basic dXNlckB1c3Nlci5jb206cGFzc3dvcmQ=').expect(401, done);
        });

        // use correct mail / password of the user
        it('should return 200 thanks to good credentials on classic route', function(done){
            request(app).get('/tests/auth/basic').send().set('Authorization', helper.hashBasicAccessAuth(user)).expect(200, done);
        });
    });

});