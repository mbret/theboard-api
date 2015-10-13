'use strict';

/**
 * Simply check if user is authenticated
 * if not revoke access.
 */
module.exports = function (req, res, next) {

    if( req.authenticated === true){
        return next();
    }

    return res.unauthorized();
};