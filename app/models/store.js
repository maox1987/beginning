/**
 * Created by MaoX on 2016/3/4.
 */

module.exports = function(sequelize,DataTypes){
    var Store = sequelize.define('Store',{
        name:{
            type:DataTypes.STRING,
            unique:true
        },
        owner:DataTypes.STRING,
        phone:DataTypes.STRING,
        address:DataTypes.STRING
    },{
        classMethods:{
            associate:function(models){
                Store.belongsToMany(models.User,{through:models.Manager});

            }
        }
    });
    return Store;
}