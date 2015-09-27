'use strict';

var _ = require('lodash');

exports.extendModel = function(baseModel, model){
    return _.merge( _.cloneDeep( baseModel ), model );
};