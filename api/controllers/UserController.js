'use strict';

//class UserController{
//
//    find(req, res){
//        console.log('sdf');
//        var id = req.param('id', null);
//
//        sails.models.user
//            .find(id)
//            .then(function(user){
//                if(!user){
//                    return res.notFound();
//                }
//                return res.ok(user.toJSON());
//            })
//            .catch(res.serverError);
//    }
//
//
//}
//
//module.exports = new UserController();

module.exports = {
    find: function(req, res){
        console.log('sdf');
        var id = req.param('id', null);

        sails.models.user
            .find(id)
            .then(function(user){
                if(!user){
                    return res.notFound();
                }
                return res.ok(user.toJSON());
            })
            .catch(res.serverError);
    }
};