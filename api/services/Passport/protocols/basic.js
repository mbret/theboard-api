'use strict';

var validator = require('validator');

module.exports = function (req, email, password, next) {

    if(!validator.isEmail(email)){
        return next(null, false);
    }

    var user;

    // Check user
    sails.models.user
        .findOne({email: email})
        .then(function(userFound){

            if(!userFound){
                return next(null, false);
            }

            user = userFound;
            return sails.models.passport
                .findOne({
                    protocol : 'local',
                    user     : user.id
                })
                // Check password
                .then(function(passportFound){

                    if(!passportFound){
                        return next(null, false);
                    }
                    return passportFound.validatePassword(password).then(function(isPasswordValid){
                        if (!isPasswordValid) {
                            return next(null, false);
                        }
                        else{
                            return next(null, user);
                        }
                    });
                })
        })
        .catch(next);
};
