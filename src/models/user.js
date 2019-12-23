const {sequelize} = require('../core/db')
const {Sequelize,Model} = require('sequelize');
const bcrypt = require("bcryptjs");
class User extends Model{

}

User.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nickname:Sequelize.STRING,
    email:{
        type:Sequelize.STRING(128),
        unique:true  // 是否唯一
    },
    password:{
        type:Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10);
            const pass = bcrypt.hashSync(val,salt);
            this.setDataValue('password',pass);
        }
    },
    openid:{
        type:Sequelize.STRING(64),
        unique:true  // 是否唯一
    }
},{
    sequelize,
    tableName:'user'
})

module.exports = User