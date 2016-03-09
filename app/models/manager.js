/**
 * Created by MaoX on 2016/3/4.
 */

module.exports = function(sequelize,DataTypes){
    var Manager = sequelize.define('Manager',{
        role:{
            type:DataTypes.INTEGER
        }
    },{
        classMethods:{
            assoicate:function(models){

            }
        }
    });
    return Manager;
}