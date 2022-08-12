const Service = require('./service')

class authService extends Service {

    async checkUserAuth(token){
        //тут, видимо, нужно еще добавить проверку на TTL токена
        return new Promise((resolve, reject) => {
            this.findUserByToken(token)
                .then((user) => {
                    resolve(!!user.token)
                })
                .catch((error) => {
                    reject(false)
                })
        })
    }

    async createNewUser(user){
        return new Promise((resolve, reject) => {
            this.checkIsUserExist(user.login)
                .then((isOk) => {
                    if(!isOk) {
                        reject('Такой пользователь уже зарегистрирован')
                        return
                    }
                    const passHash = this.generateMD5(user.password)

                    const userData = {
                        login   : user.login,
                        name    : user.name,
                        password: passHash
                    }
                    this._connection.query('INSERT INTO users set ?', userData, function(error, rows){
                        if(error){
                            reject(error)
                        }
                        resolve('Новый пользователь создан')
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

    /**
        вход юзера подразумевает перегенерацию токена
        при регистрации токен НЕ выдаётся
        при логауте токен очищается
    */

    async loginUser(getUser){
        const user = await this.findUserByLogin(getUser.login)
        if(!user) {
            return Promise.reject(`Нет зарегистрированного пользователя с логином ${getUser.login}`)
        }
        if(this.checkUserPasswordHash(getUser.password, user.password)){
            const token = this.generateToken()
            this.updateUserToken({login: getUser.login, token: token}, () => {})
            return {
                error: false,
                user: {
                    id   : user.id,
                    login: user.login,
                    token: token
                },
                message: 'Авторизация успешна'
            }
        } else {
            return {error: true, message: 'Введена неверная информация'}
        }
    }

    /**
        запрашивается информация пользователя при обновлении страницы или авторизации
    */
    async getUserInfo(getToken){
        const user = await this.findUserByToken(getToken)
        if(!user) {
            return Promise.reject(`Нет зарегистрированного пользователя с токеном ${getUser.login}`)
        }
        delete user.password
        return user
    }

    /**
        при логауте токен очищается
    */
    async logoutUser(token, getUser){
        const user = await this.findUserByLogin(getUser.login)

        return new Promise((resolve, reject) => {
            if(token !== user.token){
                reject('Неверный токен')
            }
            this.updateUserToken({login: user.login, token: ''}, (error, rows) => {
                if(error){
                    reject(error)
                } else {
                    resolve(rows.affectedRows)
                }
            })

        })
    }

    updateUserToken({login, token}, callback){
        this._connection.query('UPDATE users SET users.token = ? WHERE login = ?', [token, login], callback)
    }

    checkUserPasswordHash(getPassword, hash){
        return this.generateMD5(getPassword) === hash
    }

    findUserByLogin(login){
        //TODO ОБЪЕДИНИТЬ ЭТИ МЕТОДЫ
        return new Promise((resolve, reject) => {
            this.findUserByLoginQuery(login, (error, rows) => {
                if(error) reject(error)
                if(typeof rows === 'undefined') reject('Пользователь не найден')
                resolve(rows[0])
            })
        })
        .catch((e) => {
            console.log('findUserByLogin error: ', e)
        })
    }

    async findUserByToken(token){
        //TODO ОБЪЕДИНИТЬ ЭТИ МЕТОДЫ
        return new Promise((resolve, reject) => {
            this.findUserByTokenQuery(token, (error, rows) => {
                if(error) reject(error)
                if(typeof rows === 'undefined') reject('Пользователь не найден')
                resolve(rows[0])
            })
        })
        .catch((e) => {
            console.log('findUserByToken error: ', e)
        })
    }

    async checkIsUserExist(login) {
        return new Promise((resolve, reject) => {
            this.findUserByLoginQuery(login, (error, rows) => {
                if(error){
                    reject(error)
                }
                resolve(rows.length <= 0)
            })
        })
        .catch((e) => {
            console.log('checkIsUserExist error: ', e)
        })
    }

    findUserByLoginQuery(login, callback){
        this._connection.query('SELECT * FROM users WHERE login = ? LIMIT 1', login, callback)
    }

    findUserByIdQuery(id, callback){
        this._connection.query('SELECT * FROM users WHERE id = ? LIMIT 1', id, callback)
    }

    findUserByTokenQuery(token, callback){
        this._connection.query('SELECT * FROM users WHERE token = ? LIMIT 1', token, callback)
    }

};//class end




module.exports = authService




// function findUserById(id){
//     return new Promise((resolve, reject) => {
//         findUserByIdQuery(id, (error, rows) => {
//             if(error) reject(error)
//             resolve(rows[0])
//         })
//     })
//     .catch((e) => {
//         console.log('findUserById error: ', e)
//     })
// }