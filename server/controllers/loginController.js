const authService = require('../services/authService.js')
//const passport = require('passport')

const loginController = function (req, res, next) {
    // //! AUTHENTICATE USER
    console.log('LOGIN Controller starts')
    console.log('Try login user: ', req.body.login, req.body.password)
    authService.loginUser(req.body)
        .then((user) => {
            res.send({ authData: user, error: false, message: '' })
        })
        .catch((error) => {
            res.send({ error: true, message: error })
            return
        })
}

module.exports = loginController