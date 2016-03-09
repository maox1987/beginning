/**
 * Created by MaoX on 2016/2/29.
 */
var express = require('express');
var router = express.Router();

var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var authRequired = require('../lib/authRequired');
var Admin = require('../app/controllers/admin');

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
router.get('/user/info',authRequired(),User.info);
router.get('/user/edit',authRequired(),User.showEdit);
router.get('/user/changePassword',authRequired(),User.showChangePassword);
router.post('/user/edit',authRequired(),User.edit);
router.post('/user/changePassword',authRequired(),User.changePassword);

//系统管理
router.get('/admin/user/list',authRequired(20),Admin.user.list);
router.get('/admin/user/:id',authRequired(20),Admin.user.info);
router.get('/admin/user/edit/:id',authRequired(20),Admin.user.showEdit);
router.post('/admin/user/edit',authRequired(20),Admin.user.edit);

router.get('/admin/store/list',authRequired(20),Admin.store.list);
router.get('/admin/store/:id',authRequired(20),Admin.store.info);
router.get('/admin/store/edit/:id',authRequired(20),Admin.store.showEdit);
router.post('/admin/store/edit',authRequired(20),Admin.store.edit);
router.get('/admin/store/:id/user',authRequired(20),Admin.store.user);
router.post('/admin/store/addUser',authRequired(20),Admin.store.addUser);
router.post('/admin/store/removeUser',authRequired(20),Admin.store.removeUser);

//店铺管理
router.get('/store',Index.store);