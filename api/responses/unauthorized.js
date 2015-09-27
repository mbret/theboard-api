/**
 * 401 (Unauthorized) Handler
 *
 * @description Mean that the server doesn't know who you are and you must be authenticated
 *
 *
 */

module.exports = function unauthorized(data, code, message) {

    // Get access to `req`, `res`, & `sails`
    var req = this.req;
    var res = this.res;
    var sails = req._sails;

    var response = {
        code: code || 'E_UNAUTHORIZED',
        message: message || 'Not authorized',
        data: data || {}
    };

    // Set status code
    res.status(401);

    return res.jsonx(response);

};

