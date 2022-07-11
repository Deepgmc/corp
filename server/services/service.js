const {connection} = require('../mysql_connection.js')
const crypto = require('crypto')

class Service {

    _crypto = crypto
    _connection = connection


    getMD5(pass){
        return this._crypto.createHash('md5').update(pass).digest('hex')
    }

    generateToken(){
        return this._crypto.randomBytes(20).toString('hex')
    }

    validateToken (token){
        if(!token) return false
        if(token.length < 40) return false
        return true
    }

    generateMD5(str){
        return this._crypto.createHash('md5').update(str).digest('hex')
    }

    generateToken(){
        return this._crypto.randomBytes(20).toString('hex')
    }
}

module.exports = Service