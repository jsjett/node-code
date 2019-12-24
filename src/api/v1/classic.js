const Router = require("koa-router")
const router = new Router({
    prefix:'/v1/classic'
})
const AuthMiddleWare = require('../../middleWare/auth')

router.get('/lates',new AuthMiddleWare().m,(ctx, next) => {
    ctx.body = ctx.auth;
})

module.exports = router;