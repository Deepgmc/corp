const authS = require('../../services/authService.js')

const authService = new authS()
const register = function (req, res, next) {
    //! CREATE NEW USER
    console.log('REGISTER Controller starts', req.body)
    console.log('Try register user: ', req.body.data.login, req.body.data.password)

    authService.createNewUser(req.body.data)
        .then((successText) => {
            res.send({data: {error: false, message: successText}})
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