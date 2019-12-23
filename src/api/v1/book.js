const Router = require("koa-router");
const router = new Router();
const {CheckDemo} = require('../../validator/validate');

router.post('/v1/classic/book',async (ctx,next) => {
    const v = await new CheckDemo().validate(ctx);
    ctx.body = {
        id:v.get('body.id')
    }
})

module.exports = router;