const {connection, connect} = require('../mysql_connection.js')
const bcryptjs = require('bcryptjs')


function createNewUser(user){
    return new Promise((resolve, reject) => {
        checkIsUserExist(user.login)
            .then((isOk) => {
                if(!isOk) {
                    reject('Login already exists')
                    return
                }
                const salt = bcryptjs.genSaltSync(10)
                const userData = {
                    login: user.login,
                    password: bcryptjs.hashSync(user.password, salt)
                }
                connection.query('INSERT INTO users set ?', userData, function(error, rows){
                    if(error){
                        reject(error)
                    }
                    resolve('User created success')
                })
            })
            .catch((error) => {
                console.log('checkIsUserExist catch', error)
            })
    })
    .catch((error) => {
        return Promise.reject(error)
    })
}

function checkIsUserExist(login) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE login = ?', login, function(error, rows){
            if(error){
                reject(error)
            }
            resolve(rows.length < 0)
            // if(rows.length > 0){
            //     resolve(false)
            // } else {
            //     resolve(true)
            // }
        })
    })
    .catch((e) => {
        console.log('checkIsUserExist error: ', e)
    })
}

module.exports = {
    createNewUser
}