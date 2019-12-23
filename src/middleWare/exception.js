const {HttpException} = require('../core/http-exception');
const cacheError = async (ctx,next) => {
    try {
        await next();
    }catch (e) {
        const isDev = global.config.env === 'development';
        const isHttpException = e instanceof HttpException;
        if(isDev && !isHttpException){
            throw e;
        }
        const reqUrl = `${ctx.method} ${ctx.path}`;
        if(isHttpException){
            ctx.body = {
                msg:e.msg,
                error_code:e.errorCode,
                request:reqUrl
            }
            // http错误码
            ctx.status = e.status;
        }else {
            ctx.body = {
                msg: '未知错误',
                error_code: 99999,
                request: reqUrl
            }

            ctx.status = 500;
        }
    }
}

module.exports = cacheError;