var assert  = require("assert");
var request = require('supertest');

describe('integration', function() {

    describe("Server", function(){
        it('should ping the server', function(done){
            request(sails.hooks.http.app).get('/ping').expect(200).end(done);
        });
    });

});
