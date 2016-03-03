/**
 * Created by MaoX on 2016/3/2.
 */
var models = require('../models');
var underscore = require('underscore');

var user = {};
exports.user = user;


user.list = function(req,res,next){
    var page = {};
    page.current = parseInt(req.query.page || 0);
    page.size = parseInt(req.query.count || 10);
    if(page.size <1 || page.size >30){
        page.size =10;
    }
    models.User.count().then(function(totalCount){
        page.total = Math.ceil(totalCount/page.size);
        models.User.findAll({
                limit:page.size,
                offset:page.size*page.current
            })
            .then(function(users){
                res.render('admin/userList',{
                    title:'账号列表',
                    users:users,
                    page:page

                });
            })
    })

};

user.info = function(req,res,next){
    var id = req.params.id;
    models.User.findById(id).then(function(user){
        if(user){
            res.render('admin/userInfo',{
                title:'用户信息',
                user:user
            })
        }

    })
};

user.showEdit = function(req,res,next){
    var id = req.params.id;
    models.User.findById(id).then(function(user){
        if(user){
            res.render('admin/userEdit',{
                title:'用户修改',
                user:user
            })
        }
    })
};

user.edit = function(req,res,next){
    var id = req.params.id;
    var _user = req.body.user;
    models.User.findById(id).then(function(user){
        if(user){
            user.name = _user.name;
            user.phone = _user.phone;
            user.role = _user.role;

            user.save().then(function(results){
                res.redirect('/admin/user/list');
            });
        }
    })
};