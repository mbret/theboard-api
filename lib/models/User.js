'use strict';

var crypto  = require('crypto');
var path    = require('path');
var libUtil = require(LIB_DIR + '/util');

/**
 * User model
 */
module.exports = libUtil.extendModel(require(LIB_DIR + '/models/Base'), {

    schema: true,

    attributes: {

        email: {
            type: 'email',
            unique: true,
            index: true
        },

        passports: {
            collection: 'Passport',
            via: 'user'
        },

        getGravatarUrl: function () {
            var md5 = crypto.createHash('md5');
            md5.update(this.email || '');
            return 'https://gravatar.com/avatar/'+ md5.digest('hex');
        },

    },

    /**
     * Register a new User with a passport
     * @return {Promise}
     */
    register: function (_user) {
        return new Promise(function (resolve, reject) {

            var password = _user.password;

            // Create user
            return sails.models.user.create(_user, function (err, user) {
                if (err) {
                    sails.log(err);

                    if (err.code === 'E_VALIDATION') {
                        return reject(err);
                    }

                    return reject(err);
                }

                // Create passport
                sails.models.passport.create({
                    protocol : 'local'
                    , password : password
                    , user     : user.id
                }, function (err, passport) {
                    if (err) {
                        return user.destroy(function (destroyErr) {
                            reject(destroyErr || err);
                        });
                    }

                    resolve(user);
                });
            });

        });
    }
});