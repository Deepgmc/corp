const authService = require('../services/authService.js')


const registerController = function (req, res, next) {
    //! CREATE NEW USER
    console.log('REGISTER Controller starts')
    console.log('Try register user: ', req.body.login, req.body.password)
    authService.createNewUser(req.body)
        .then((successText) => {
            res.send({error: false, text: successText})
        })
        .catch((error) => {
            res.send({error: true, text: error})
            return
        })
}

module.exports = registerController