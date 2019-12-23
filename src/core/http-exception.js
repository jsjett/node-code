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
    constructor({msg='ok'} = {}) {
        super();
        this.msg = msg;
        this.errorCode = 0;
        this.status = 201;
    }
}

module.exports = {
    HttpException,
    ParametersException,
    SuccessException
}