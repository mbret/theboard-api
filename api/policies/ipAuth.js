'use strict';

var ip = require('ip');

/**
 * Implement a policy based on ip
 * @param req
 * @param res
 * @param next
 */

module.exports = function(req, res, next){
console.log(ip.isEqual(req.ip, '127.0.0.1'));
    if(ip.isEqual(req.ip, '127.0.0.1')){
        req.authenticated = true;
        return next();
    }

    return res.unauthorized();

};
