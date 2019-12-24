const {sequelize} = require('../core/db')
const {Sequelize,Model} = require('sequelize')
const bcrypt = require("bcryptjs")
const {NoFoundException,AuthException} = require('../core/http-exception')

class User extends Model{

    // 校验账号密码是否正确
    static async verifyEmailPassword(email,planPass){
        const user = await User.findOne({
            where:{
                email
            }
        })
        if(!user){
            throw new NoFoundException({msg:'用户不存在'})
        }
        
        const correct = bcrypt.compareSync(planPass,user.password);

        if(!correct){
            throw new AuthException({msg:'密码不正确'})
        }

        return user;
    }
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