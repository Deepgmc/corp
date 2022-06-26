const {connection} = require('../mysql_connection.js')
const crypto = require('crypto')
// const bcryptjs = require('bcryptjs')
// const passport = require('passport')
// const passportLocal = require('passport-local')

function createNewUser(user){
    return new Promise((resolve, reject) => {
        checkIsUserExist(user.login)
            .then((isOk) => {
                if(!isOk) {
                    reject('Login already exists')
                    return
                }
                //const salt = bcryptjs.genSaltSync(10)
                // const userData = {
                //     login   : user.login,
                //     password: bcryptjs.hashSync(user.password, salt)
                // }
                const token = crypto.randomBytes(20).toString('hex')
                const passHash = getMD5(user.password)


                const userData = {
                    login   : user.login,
                    password: passHash,
                    token   : token
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

async function loginUser(getUser){
    const user = await findUserByLogin(getUser.login)
    if(checkUserPassword(getUser.password, user.password)){
        return {
            error: false,
            user: {
                id   : user.id,
                login: user.login,
                token: user.token
            },
            message: 'Login success'
        }
    } else {
        return {error: true, message: 'Invalid login information'}
    }


    //user.login, user.password
    // return new Promise((resolve, reject) => {
    //     passport.authenticate('local', {
    //         successRedirect: '/',
    //         failureRedirect: '/login',
    //         successFlash   : false,
    //         failureFlash   : false
    //     })
    //     resolve('Logined success')
    // })
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
    connection.query('SELECT * FROM users WHERE login = ?', login, callback)
}
function findUserByIdQuery(id, callback){
    connection.query('SELECT * FROM users WHERE id = ?', id, callback)
}

function getMD5(pass){
    return crypto.createHash('md5').update(pass).digest('hex')
}


module.exports = {
    createNewUser,
    loginUser,
    //initPassportLocal,
    findUserById,
    findUserByLogin
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