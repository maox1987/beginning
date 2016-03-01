/**
 * Created by MaoX on 2016/2/29.
 */
var express = require('express');
var router = express.Router();

var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');

module.exports =router;
//首页
router.get('/',Index.index);

//登录、注册、注销
router.get('/login',User.showLogin);
router.get('/register',User.showRegister);
router.post('/register',User.register);
router.post('/login',User.login);
router.get('/logout',User.logout);

//个人中心
router.get('/user/info',User.info);
router.get('/user/edit',User.showEdit);
router.get('/user/changePassword',User.showChangePassword);
router.post('/user/edit',User.edit);
router.post('/user/changePassword',User.changePassword);
