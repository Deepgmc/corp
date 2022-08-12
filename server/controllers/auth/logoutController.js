const authS = require('../../services/authService.js')

const logoutController = function (req, res, next) {

    const authService = new authS()
    authService.logoutUser(req.body.token, req.body.user)
        .then((result) => {
            if(result) res.send({ error: false, message: 'Logout success' })
            else res.send({ error: true, message: 'Logout error' })
        })
        .catch((error) => {
            res.send({ error: true, message: error })
            return
        })

}

module.exports = logoutController