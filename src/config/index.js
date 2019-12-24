module.exports = {
    env:'development',
    databases:{
        dbName:'jett-databases',
        user:'root',
        password:'123456',
        host:'localhost',
        port:3306
    },
    security:{
        secretKey:'jett-token-key',
        expiresIn:60*60  // 一个小时
    }
}