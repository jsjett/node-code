/**
 * http异常
 */
class HttpException extends Error {
    /**
     * 构造函数
     * @param 可选参数，通过{}的形式传入
     */
    constructor({code = 500, msg = "服务器未知错误", errorCode = 999}={}) {
        super();
        this.status = code;
        this.msg = msg;
        this.errorCode = errorCode;
    }
}

/**
 * 参数错误异常类
 */
class ParametersException extends HttpException {

    constructor({code = 400, msg = '参数错误', errorCode = 10030}={}) {
        super();
        this.status = code;
        this.msg = msg;
        this.errorCode = errorCode;
    }
}

class SuccessException extends HttpException {
    constructor({msg='ok',errorCode = 0} = {}) {
        super();
        this.msg = msg;
        this.errorCode = errorCode;
        this.status = 201;
    }
}

class NoFoundException extends HttpException {
    constructor({msg='资源不存在',errorCode=10004} = {}){
        super();
        this.msg = msg;
        this.errorCode = errorCode;
        this.status = 404;
    }
}
 
class AuthException extends HttpException{
    constructor({msg='权限不足',errorCode=10005} = {}){
        super();
        this.msg = msg;
        this.errorCode = errorCode;
        this.status = 401;
    }
}

class Forbbiden extends HttpException{
    constructor({msg = '禁止访问',errorCode = 10006} = {}){
        super();
        this.msg = msg;
        this.errorCode = errorCode;
        this.status = 403;
    }
}

module.exports = {
    HttpException,
    ParametersException,
    SuccessException,
    NoFoundException,
    AuthException,
    Forbbiden
}