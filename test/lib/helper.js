'use strict';

/**
 *
 * @param email
 * @param password
 */
exports.hashBasicAccessAuth = function(email, password){
    var e = email;
    var p = password;
    if(typeof email === "object" && email.email){
        p = email.password;
        e = email.email;
    }
    return "Basic " + new Buffer(e + ':' + p).toString('base64');
};