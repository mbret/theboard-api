var request = require('supertest');
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

        it('should pass because no Basic auth asked', function(done){
            request(app).get('/auth/basic').set('Authorization', '').expect(200, done);
        });

        it('should return 401 because no Auth provided', function(done){
            request(app).get('/auth/basic').set('Authorization', 'Basic ').expect(401, done);
        });

        it('should return 401 (bad request)', function(done){
            request(app).get('/auth/basic').set('Authorization', 'Basic dXNlckB1c3Nlci5jb206cGFzc3dvcmQ=').expect(401, done);
        });

        // use correct mail / password of the user
        //it('should return 200 thanks to good credentials on classic route', function(done){
        //    request(app).get('/auth/basic').send().set('Authorization', sails.config.test.userAuth).expect(200, done);
        //});
    });

});