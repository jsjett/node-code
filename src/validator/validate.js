const {ParametersException} = require('../core/http-exception')
const User = require('../models/user')
const {BaseValidator, Rule} = require('../lib/validator')

class CheckDemo extends BaseValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isNotEmpty', "id不能为空")
        ]
    }
}

class RegisterValidator {

    constructor(data = {}) {
        this.errors = [];
        this.data = data;
    }

    async validate() {
        const {nickname, email, password1, password2} = this.data;
        !nickname && this.errors.push("昵称不能为空")
        !email && this.errors.push("邮箱")
        !password1 && this.errors.push("密码不能为空")
        !(password1 === password2) && this.errors.push("两次密码输入不一致")
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            this.errors.push("邮箱已经存在")
        }
        if (this.errors.length === 0) {
            return {
                nickname,
                email,
                password: password1
            };
        } else {
            throw new ParametersException({msg: this.errors})
        }
    }

}


module.exports = {
    RegisterValidator,
    CheckDemo
}