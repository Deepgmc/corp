const {connection} = require('../mysql_connection.js')
const crypto = require('crypto')

function createNewUser(user){
    return new Promise((resolve, reject) => {
        checkIsUserExist(user.login)
            .then((isOk) => {
                if(!isOk) {
                    reject('Такой пользователь уже зарегистрирован')
                    return
                }
                const passHash = getMD5(user.password)

                const userData = {
                    login   : user.login,
                    password: passHash
                }
                connection.query('INSERT INTO users set ?', userData, function(error, rows){
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

async function loginUser(getUser){
    const user = await findUserByLogin(getUser.login)
    if(!user) {
        return Promise.reject(`Нет зарегистрированного пользователя с логином ${getUser.login}`)
    }
    if(checkUserPassword(getUser.password, user.password)){
        const token = generateToken()
        updateUserToken({login: getUser.login, token: token}, () => {})
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
async function getUserInfo(getToken){
    const user = await findUserByToken(getToken)
    if(!user) {
        return Promise.reject(`Нет зарегистрированного пользователя с ткеном ${getUser.login}`)
    }
    user.password = null
    return user
}

/**
    при логауте токен очищается
*/
async function logoutUser(token, getUser){
    const user = await findUserByLogin(getUser.login)

    return new Promise((resolve, reject) => {
        if(token !== user.token){
            reject('Неверный токен')
        }
        updateUserToken({login: user.login, token: ''}, (error, rows) => {
            if(error){
                reject(error)
            } else {
                resolve(rows.affectedRows)
            }
        })

    })
}

function updateUserToken({login, token}, callback){
    console.log('UPDATE TOKEN:', login, token);
    connection.query('UPDATE users SET users.token = ? WHERE login = ?', [token, login], callback)
}



function checkUserPassword(getPassword, hash){
    return getMD5(getPassword) === hash
}


function findUserByLogin(login){
    return new Promise((resolve, reject) => {
        findUserByLoginQuery(login, (error, rows) => {
            if(error) reject(error)
            resolve(rows[0])
        })
    })
    .catch((e) => {
        console.log('findUserByLogin error: ', e)
    })
}

function findUserByToken(token){
    return new Promise((resolve, reject) => {
        findUserByTokenQuery(token, (error, rows) => {
            if(error) reject(error)
            resolve(rows[0])
        })
    })
    .catch((e) => {
        console.log('findUserByToken error: ', e)
    })
}

function checkIsUserExist(login) {
    return new Promise((resolve, reject) => {
        findUserByLoginQuery(login, (error, rows) => {
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

function findUserByLoginQuery(login, callback){
    connection.query('SELECT * FROM users WHERE login = ? LIMIT 1', login, callback)
}
function findUserByIdQuery(id, callback){
    connection.query('SELECT * FROM users WHERE id = ? LIMIT 1', id, callback)
}

function findUserByTokenQuery(token, callback){
    connection.query('SELECT * FROM users WHERE token = ? LIMIT 1', token, callback)
}

function getMD5(pass){
    return crypto.createHash('md5').update(pass).digest('hex')
}

function generateToken(){
    return crypto.randomBytes(20).toString('hex')
}


module.exports = {
    createNewUser,
    loginUser,
    findUserById,
    findUserByLogin,
    logoutUser,
    getUserInfo
}
















function findUserById(id){
    return new Promise((resolve, reject) => {
        findUserByIdQuery(id, (error, rows) => {
            if(error) reject(error)
            resolve(rows[0])
        })
    })
    .catch((e) => {
        console.log('findUserById error: ', e)
    })
}



// async function compareUserPassword(user, password){
//     return new Promise(async (resolve, reject) => {
//         const isMatched = true//await bcryptjs.compare(user.password, password)
//         if(isMatched) resolve(true)
//         reject('Password is incorrect')
//     })
// }
// function initPassportLocal(){
    //     console.log('Init passport local')

    //     const localStrategy = passportLocal.Strategy
    //     passport.use(new localStrategy({
    //             usernameField    : 'login',
    //             passwordField    : 'password',
    //             passReqToCallback: true
    //         },
    //         async (req, login, password, next) => {
    //             const user = await findUserByLogin(login)
    //             if(!user){
    //                 return next(null, false, null)
    //             }
    //             console.log('Found user:', user)
    //             const match = await compareUserPassword(user, password)
    //             if(match === true){
    //                 return next(null, user, null)
    //             } else {
    //                 return next(null, false, null)
    //             }
    //         }
    //     ))
    // }

    // passport.serializeUser((user, next) => {
    //     next(null, user.id)
    // })

    // passport.deserializeUser((id, next) => {
    //     findUserById(id)
    //         .then(user => {
    //             return next(null, user)
    //         })
    //         .catch(error => {
    //             return next(error, null)
    //         })
    // })