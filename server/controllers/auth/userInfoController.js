const authS = require('../../services/authService.js')

const authService = new authS()
const userInfoController = function (req, res, next) {
    //! get user Info
    console.log('Пытаемся взять информацию пользователя:', req.body.token)

    if(!req.body.token) {
        res.send({ error: true, message: 'Неверный токен' })
        return
    }

    authService.getUserInfo(req.body.token)
        .then((userInfo) => {
            res.send(userInfo)
        })
        .catch((error) => {
            res.send({ error: true, message: error })
            return
        })
}

module.exports = userInfoController