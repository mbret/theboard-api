var expect = require('chai').expect;

describe('integration.models.user', function() {

    describe('create', function() {

        it('should create correct user', function (done) {
            sails.models.user
                .register({
                    email: 'xmax54@gmail.com',
                    password: 'password'
                })
                .then(function(user) {

                    expect(user).to.exist;
                    expect(user).to.be.a('object');
                    expect(user).to.have.include.keys('email', 'profiles', 'settings');

                    // should contain at least one profile
                    expect(user.profiles).to.not.be.empty;

                    done();
                })
                .catch(done);
        });

    });

});