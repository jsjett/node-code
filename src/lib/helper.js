const {SuccessException} = require('../core/http-exception')
const jwt = require('jsonwebtoken')

const successCallback = (msg) => {
    throw new SuccessException({msg});
}

function getAllMethodNames(obj, option = {}) {
    let methods = new Set();
    while ((obj = Reflect.getPrototypeOf(obj))) {
        let keys = Reflect.ownKeys(obj);
        keys.forEach(k => methods.add(k));
    }
    let keys = Array.from(methods.values());
    return prefixAndFilter(keys, option);
}

function prefixAndFilter(keys = [], option = {}) {
    option &&
    option.prefix &&
    (keys = keys.filter(key => key.toString().startsWith(option.prefix)));
    option && option.filter && (keys = keys.filter(option.filter));
    return keys;
}

function getAllFieldNames(obj, option = {}) {
    let keys = Reflect.ownKeys(obj);
    return prefixAndFilter(keys, option);
}

/**
 * 
 * @param {用户id} uid 
 * @param {权限参数} scope 
 */
function generateToken (uid,scope) {
    const {secretKey,expiresIn} = global.config.security;
    const token = jwt.sign({
        uid,
        scope
    },secretKey,{expiresIn})
    return token;
}

module.exports = {
    successCallback,
    getAllMethodNames,
    getAllFieldNames,
    generateToken
}