/**
 * Created by MaoX on 2016/2/27.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var settings = require('./config/settings');
var router = require('./routes/index');
var logger = require('morgan');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');
//环境变量
var app = express();

var logDirectory = __dirname+'/log';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);//保证日志目录存在


app.set('views','./app/views/pages');
app.set('view engine','jade');

//连接数据库
models = require('./app/models');
//数据初始化
models.sequelize.sync({force:true}).then(function(){
    models.User.create({
        name:"maox",
        password:"123456",
        role:51
    }).then(function(){
        for(var i=0;i<30;i++){
            models.User.create({
                name:'test'+i,
                password:"123456",
                role:10
            })
        }
    });

});

//使用中间件
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
    secret:'maox',
    resave: false,
    saveUninitialized:true
}));

//路由
app.use(function(req,res,next){
    res.locals.user = req.session.user;
    next();
});

app.use('/',router);

app.use(function(req,res,next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handlers

app.use(function(err,req,res,next){
    if(typeof(err) == "number"){
        if(err === 401){
            return res.redirect('/login');
        }
        return res.render('error',{
            message:err
        })
    }
    if(err.status === 401){
        return res.redirect('/login');
    }
    res.status(err.status || 500);
    res.render('error',{
        message:err.message,
        error:err
    })
});


if('development' === app.get('env')){
    app.set('showStackError',true);
    app.use(logger('dev'));
    app.locals.pretty = true;
}else{
    var accessLogStream = FileStreamRotator.getStream({
        date_format:'YYYYMMDD',
        filename:logDirectory+'/access-%DATE%.log',
        frequency:'daily',
        verbose:false
    });
    app.use(logger('combined',{stream: accessLogStream}));
}

//监听端口
app.listen(settings.port,function(){
    console.log('server started on port '+settings.port);
});
