const Koa = require('koa');
const app = new Koa();
const InitManager = require('./core/init');
const parser = require("koa-bodyparser");
const cacheError = require("./middleWare/exception");
app.use(cacheError);
app.use(parser())
InitManager.initCore(app);
app.listen(3000,() => {
    console.log("server is start at 3000")
});
