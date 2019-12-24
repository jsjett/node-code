
function isThisType(val) {
    for(let key in this){
        if(this[key] === val){
            return true;
        }
    }
    return false;
}

const LoginType = {
    USER_MINI_PROGRAM:10001,
    USER_EMAIL:10002,
    USER_PHONE:10003,
    ADMIN_EMAIL:20001,
    isThisType
}

module.exports = {
    LoginType
}