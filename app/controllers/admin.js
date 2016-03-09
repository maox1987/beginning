/**
 * Created by MaoX on 2016/3/2.
 */
var models = require('../models');
var underscore = require('underscore');

var user = {};
var store = {};
exports.user = user;
exports.store = store;

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
        if(!user){
            return next(404);
        }

        res.render('admin/userInfo',{
            title:'用户信息',
            user:user
        })



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

    var _user = req.body.user;
    models.User.findById(_user.id).then(function(user){
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

store.list = function(req,res,next){
    var page = {};
    page.current = parseInt(req.query.page || 0);
    page.size = parseInt(req.query.count || 10);
    if(page.size <1 || page.size >30){
        page.size =10;
    }
    models.Store.count().then(function(totalCount){
        page.total = Math.ceil(totalCount/page.size);
        models.Store.findAll({
            limit:page.size,
            offset:page.size*page.current
        }).then(function(stores){
            res.render('admin/storeList',{
                title:'店铺列表',
                stores:stores,
                page:page
            });
        });
    });
};

store.info = function(req,res,next){
    var _id = req.params.id;
    models.Store.findById(_id).then(function(store){
        if(!store){
            return next(404);
        }
        res.render('admin/storeInfo',{
            title:"店铺信息",
            store:store
        });
    })
};

store.showEdit = function(req,res,next){
    var _id = req.params.id;
    models.Store.findById(_id).then(function(store){
        if(!store){
            return next(404);
        }
        res.render('admin/storeEdit',{
            title:"店铺修改",
            store:store
        });
    });
};

store.edit = function(req,res,next){
    var _store = req.body.store;
    models.Store.update({
        name:_store.name,
        owner:_store.owner,
        phone:_store.phone,
        address:_store.address
    },{
        where:{id:_store.id}
    }).then(function(results){
        return res.redirect('/admin/store/list');
    }).catch(function(err){
        next(err);
    })
};

store.user = function(req,res,next){
    var _id = req.params.id;
    models.Store.findById(_id).then(function(store){
        if(!store){
            next(404);
        }
        store.getUsers().then(function(users){
            console.log(users);
            res.render('admin/storeUser',{
                title:'管理账号',
                store:store,
                users:users

            })
        })
    })
};

store.addUser = function(req,res,next){
    var storeId = req.body.store.id;
    var userName = req.body.user.name;

    models.User.findOne({where:{name:userName}})
        .then(function(user){
            if(!user){
                console.log('账号不存在');
                return next(404);
            }
            models.Store.findById(storeId)
                .then(function(store){
                    if(!store){
                        console.log('店铺不存在');
                        return next(404);
                    }
                    store.addUser(user,{role:20})
                        .then(function(result){
                            return res.redirect('/admin/store/'+storeId+'/user');
                        }).catch(function(err){
                        next(err);
                    });

                });
        });
};

store.removeUser = function(req,res,next){
    var storeId = req.body.storeId;
    var userId = req.body.userId;
    console.log(req.body);

    models.User.findById(userId)
        .then(function(user){
            if(!user){
                console.log('user is not exist');
                return res.json({success:0})
            }
            models.Store.findById(storeId)
                .then(function(store){
                    if(!store){
                        console.log('store is not exist');
                        return res.json({success:0})
                    }
                    store.removeUser(user)
                        .then(function(result){
                            return res.json({success:1})
                        }).catch(function(err){
                        return res.json({success:0})
                    });

                });
        });
};