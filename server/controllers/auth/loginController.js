const authS = require('../../services/authService.js')

const loginController = function (req, res, next) {
    //! AUTHENTICATE USER

    const authService = new authS()
    console.log('Попытка авторизации юзера: ', req.body.login, req.body.password)
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