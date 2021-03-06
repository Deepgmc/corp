const authS = require('../../services/authService.js')

const loginController = function (req, res, next) {
    //! get user Info
    console.log('Пытаемся взять информацию пользователя:', req.body.token)

    const authService = new authS()
    authService.getUserInfo(req.body.token)
        .then((userInfo) => {
            res.send(userInfo)
        })
        .catch((error) => {
            res.send({ error: true, message: error })
            return
        })
}

module.exports = loginController