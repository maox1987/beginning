var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR =10;
module.exports = function(sequelize,DataTypes){
    var User = sequelize.define('User',{
        name:{
            type:DataTypes.STRING,
            unique:true
        },
        password:{
            type:DataTypes.STRING
        },
        phone:{
            type:DataTypes.STRING,
            unique:true
        },
        role:{
            type:DataTypes.INTEGER
        }
    },{
        hooks:{
            beforeCreate: function(user,options,next){
                bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
                    if(err) return next();

                    bcrypt.hash(user.password,salt,function(err,hash){
                        if(err) return next();

                        user.password = hash;
                        next();
                    })
                })
            }
        },
        classMethods:{
            associate:function(models){

            }
        },
        instanceMethods:{

            comparePassword:function(password,cb){
                bcrypt.compare(password,this.password,function(err,isMatch){
                    if(err) return cb(err);
                    cb(null,isMatch);
                });
            }
        },
        setterMethods:{
            setPassword:function(value){
                var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
                var hash = bcrypt.hashSync(value,salt);
                this.setDataValue('password',hash);
            }
        }
    });

    return User;

};