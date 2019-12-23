const Sequelize = require('sequelize');
const {
    dbName,
    user,
    password,
    host,
    port
} = require('../config').databases;

const sequelize = new Sequelize(dbName,user,password,{
    host,
    port,
    dialect:'mysql',
    logging:true,
    timezone:'+08:00',
    define:{
        paranoid:true,
        timestamps:true,
        createdAt:'created_at',
        updatedAt:'updated_at',
        deletedAt:'deleted_at',
        underscored:true,
        freezeTableName:true
    }
})

sequelize.sync({
    force:false, //如果是true 先丢弃表 在创建
});

module.exports = {
    sequelize
};