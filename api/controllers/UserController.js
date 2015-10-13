'use strict';

var validator = require('validator');

module.exports = {

    find: function(req, res){
        var id = req.param('id', null);

        if(!validator.isNumeric(id)){
            return res.badRequest('bad id');
        }

        sails.models.user
            .findOne(id)
            .populate('profiles')
            .then(function(user){
                if(!user){
                    return res.notFound();
                }
                return res.ok(user.toJSON());
            })
            .catch(res.serverError);
    }

};