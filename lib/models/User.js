'use strict';

var crypto  = require('crypto');
var path    = require('path');
var libUtil = require(LIB_DIR + '/util');

/** @module User */
module.exports = libUtil.extendModel(require(LIB_DIR + '/models/Base'), {

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
     */
    register: function (user) {
        return new Promise(function (resolve, reject) {
            sails.services.passport.protocols.local.createUser(user, function (error, created) {
                if (error) return reject(error);

                resolve(created);
            });
        });
    }
});