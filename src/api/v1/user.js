const Router = require("koa-router")
const {RegisterValidator} = require('../../validator/validate')
const {successCallback} = require('../../lib/helper')
const User = require('../../models/user');

const router = new Router({
    prefix:'/v1/user'
});

// 注册
router.post('/register',async (ctx,next) => {
    const body = ctx.request.body;
    const data = await new RegisterValidator(body).validate();
    await User.create(data);
    successCallback();
})

// 登录
router.post('/login',async (ctx,next) => {

    ctx.body = "111"
})

module.exports = router;