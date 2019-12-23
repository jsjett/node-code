const Router = require("koa-router")

const router = new Router();

router.get('/v1/classic/classic',(ctx,next) => {
    ctx.body = '<h3>/classic/classic</h3>'
})

module.exports = router;