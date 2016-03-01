/**
 * Created by MaoX on 2016/2/29.
 */
var models = require('../models');
var User = models.User;

exports.showLogin=function(req,res){
    res.render('login',{
        title:'登录'
    })
};

exports.showRegister = function(req,res){
    res.render('register',{
        title:'注册'
    })
};

exports.register =function(req,res){
    models.User.create({
        name: req.body.user.name,
        password:req.body.user.password

    }).then(function(user){
        console.log(user);
        res.redirect('/login');
    });

};

exports.login =function(req,res){
    var _user = req.body.user;
    if(!_user.name){
        return console.log('请输入用户名');
    }
    models.User.findOne({where:{name:_user.name}})
        .then(function(user){
            if(user)
            {
                user.comparePassword(_user.password,function(err,isMatch){
                    if(err) return next(err);
                    if(isMatch){
                        console.log(user.dataValues.name+" is Loginned");
                        req.session.user ={
                            name:user.name,
                            id:user.id
                        };
                        res.redirect('/');
                    }else{
                        console.log('password is wrong');
                    }

                })
            }
            else{
                console.log(_user.name+" is not existed");
            }
        });
};

exports.logout=function(req,res){
    delete req.session.user;
    return res.redirect('/');
};

//todo:
exports.info= function(req,res){
    var _user = req.session.user;
    if(_user){
        models.User.findById(_user.id)
            .then(function(user){
                if(user){
                    res.render('user/info',{
                        title:'个人信息',
                        user:{
                            name:user.name,
                            phone:user.phone,
                            role:user.role
                        }
                    });
                }
            })
    }

};

//todo:
exports.showEdit= function(req,res){
    var _user = req.session.user;
    if(_user){
        models.User.findById(_user.id)
            .then(function(user){
                if(user){
                    res.render('user/edit',{
                        title:'修改信息',
                        user:{
                            name:user.name,
                            phone:user.phone
                        }
                    });
                }
            })
    }

};

//todo:
exports.edit= function(req,res){
    var _user = req.body.user;
    var user = req.session.user;
    if(user){
        models.User.update({
            name:_user.name,
            phone:_user.phone
        },{
            where:{id:user.id}
        }).then(function(results){
            if(results.length>0){
                req.session.user.name = _user.name;
                req.session.user.phone = _user.phone;
            }
            res.redirect('/user/info');
        })
    }
};

//todo:
exports.showChangePassword= function(req,res){
    res.render('user/changePassword',{
        title:'修改密码'
    });
};

//todo:
exports.changePassword= function(req,res){
    var password = req.body.password;
    var user = req.session.user;
    if(user){
        models.User.findById(user.id)
            .then(function(user){
                if(user){
                    user.comparePassword(password.old,function(err,isMatch){
                        if(isMatch){
                            user.setPassword = password.new;
                            user.save().then(function(){
                                res.redirect('/');
                            })
                        }else{
                            console.log('password is not match');
                        }
                    })
                }
            })
    }
};
