'use strict';

var validator = require('validator');
var localProtocol = require('./local');

module.exports = function (req, email, password, next) {

    return localProtocol(req, email, password, next);

};
