/**
 * Created by MaoX on 2016/2/29.
 */
var models = require('../models');
var User = models.User;

exports.index=function(req,res){

    res.render('index',{
        title:'首页'
    })
};

