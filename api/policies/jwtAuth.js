'use strict';

var passport = require('passport');

/**
 * Implement a policy based on jwt authentication
 * @param req
 * @param res
 * @param next
 */

module.exports = function(req, res, next){

    var auth = req.headers.authorization;

    // Ignore request if it's not basic
    if (!auth || auth.search('JWT ') !== 0) {
        return next();
    }

    sails.log.info('jwtAuth -> authentication asked');

    passport.authenticate('jwt', { session: false }, function (err, user, info){
        if (err) return next(err);

        if(!user){
            return res.unauthorized(info);
        }
        else{
            req.user = user;
            req.authenticated = true;
            return next();
        }
    })(req, res, next);

};
