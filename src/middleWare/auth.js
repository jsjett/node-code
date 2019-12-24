const {Forbbiden} = require("../core/http-exception")
const basicAuth = require("basic-auth")
const jwt = require('jsonwebtoken')

class AuthMiddleWare {
    
    constructor(level = 1){
        this.level = level;
        AuthMiddleWare.USER = 8;
        AuthMiddleWare.ADMIN = 16;
        AuthMiddleWare.SUPER_ADMIN = 32;
    }

    get m(){

        return async (ctx,next) => {

            const userToken = basicAuth(ctx.req);

            let errorMsg = 'token不合法';

            if(!userToken || !userToken.name){
                throw new Forbbiden({msg:errorMsg});
            }
            let decode = null;

            try{
                // 验证token
                decode = jwt.verify(userToken.name,global.config.security.secretKey);

            }catch(err){

                if(err.name === 'TokenExpiredError'){
                    errorMsg = 'token已过期';
                }

                throw new Forbbiden({msg:errorMsg})
            }

            if(decode.scope < this.level){
                errorMsg = '权限不足';
                throw new Forbbiden({msg:errorMsg});
            }

            ctx.auth = {
                uid:decode.uid,
                scope:decode.scope
            }

            await next();
        }

    }

}

module.exports = AuthMiddleWare