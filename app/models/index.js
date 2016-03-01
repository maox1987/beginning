/**
 * Created by MaoX on 2016/2/29.
 */
var path = require('path');
var fs = require('fs');
var Sequelize = require('sequelize');
var settings = require('../../config/settings');
var sequelize = new Sequelize(settings.database.uri,settings.database.options);
var db = {};
fs
    .readdirSync(__dirname)
    .filter(function(file){
        return (file.indexOf('.') !==0) && (file !== 'index.js');
    })
    .forEach(function(file){
        var model = sequelize.import(path.join(__dirname,file));
        db[model.name] =model;
    });

Object.keys(db).forEach(function(modelName){
    if("associate" in db[modelName]){
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;