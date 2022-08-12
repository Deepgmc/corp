const authS = require('../../services/authService.js')

const authService = new authS()
const register = function (req, res, next) {
    //! CREATE NEW USER
    console.log('REGISTER Controller starts')
    console.log('Try register user: ', req.body.login, req.body.password)

    authService.createNewUser(req.body)
        .then((successText) => {
            res.send({error: false, message: successText})
        })
        .catch((error) => {
            res.send({error: true, message: error})
            return
        })
}

const checkUserAuth = function(req, res, next){
    authService.checkUserAuth(req.query.token)
        .then((result) => {
            res.send({error: false, foundUser: result})
        })
        .catch((error) => {
            res.send({error: true})
        })
}

module.exports = {register, checkUserAuth}