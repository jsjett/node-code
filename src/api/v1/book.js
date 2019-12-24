const Router = require("koa-router");
const router = new Router();

router.post('/v1/classic/book', async (ctx, next) => {
    ctx.body = {}
})

module.exports = router;