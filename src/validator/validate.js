const User = require('../models/user')
const {BaseValidator, Rule} = require('../lib/validator')
const {LoginType} = require('../lib/enum')

/**
 * 注册校验
 */
class RegisterValidator extends BaseValidator{

    constructor() {
        super();
        this.email = [
            new Rule('isEmail','邮箱格式不正确')
        ]
        this.password1 = [
            new Rule('isLength','密码长度6-31位',{min:6,max:32}),
            new Rule(
                'matches',
                '密码不符合规范',
                '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'
            )
        ]
        this.password2 = this.password1;
        this.nickname = [
            new Rule("isLength",'昵称长度4-32位',{min: 4,max: 32})
        ]
    }

    // 自定义检测密码
    validatePassword(ctx){
        const {password1,password2} = ctx.body;
        if(password1 !== password2){
            throw new Error("两次输入密码不一致")
        }
    }

    // 检测邮箱是否存在
    async validateEmailExits(ctx) {

        const {email} = ctx.body;

        const useData = await User.findOne({
            where:{
                email
            }
        })

        if(useData){
            throw new Error("此邮箱已经存在")
        }
    }
}

/**
 * token校验
 */

class TokenValidator extends BaseValidator{

    constructor() {
        super();
        this.account = [
            new Rule('isLength', '账号不符合规则', {
                min:4,
                max:32
            })
        ]

        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength','密码至少6个字符',{
                min:6,
                max:128
            })
        ]
    }

    // 校验登录类型
    validateLoginType(ctx) {

        const {type} = ctx.body;

        if(!type){
            throw new Error("请传入type类型")
        }

        if(!LoginType.isThisType(type)){
            throw new Error("传入的type不合法")
        }
        
    }

}

module.exports = {
    RegisterValidator,
    TokenValidator
}