const Router = require("koa-router")
const {RegisterValidator,TokenValidator} = require('../../validator/validate')
const {successCallback,generateToken} = require('../../lib/helper')
const User = require('../../models/user')
const {LoginType} = require('../../lib/enum')
const {ParametersException} = require('../../core/http-exception')
const AuthMiddleWare = require("../../middleWare/auth")
const router = new Router({
    prefix: '/v1/user'
});

// 注册
router.post('/register', async (ctx, next) => {

    const v = await new RegisterValidator().validate(ctx);

    const data = {
        nickname: v.get('body.nickname'),
        password: v.get('body.password1'),
        email: v.get('body.email')
    }

    await User.create(data);

    successCallback();
})

// 获取token接口
router.post('/token', async (ctx, next) => {

    const v = await new TokenValidator().validate(ctx);
    let token =  '';
    switch (v.get('body.type')) {
        // 小程序登录 10001
        case LoginType.USER_MINI_PROGRAM:
                
            break;
        // 邮箱登录 10002
        case LoginType.USER_EMAIL:

            token = await emailLogin(v.get('body.account'),v.get('body.secret'));

            break;
        // 手机登录 10003
        case LoginType.USER_PHONE:
            break;
        // 管理员登录 20001
        case LoginType.ADMIN_EMAIL:
            break;
        default:
            throw new ParametersException({msg:'没有相应的处理函数'});
            break;
    }

    ctx.body = {
        token
    }
})

/**
 * 
 * @param {账号} account 
 * @param {密码} secret 
 */
async function emailLogin(account,secret){
    const user = await User.verifyEmailPassword(account,secret);
    /**
     * 将用户id和权限信息生成token
     */
    return generateToken(user.id,AuthMiddleWare.USER);
}

module.exports = router;