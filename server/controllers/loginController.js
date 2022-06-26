const authService = require('../services/authService.js')
//const passport = require('passport')

const loginController = function (req, res, next) {
    // //! AUTHENTICATE USER
    console.log('LOGIN Controller starts')
    console.log('Try login user: ', req.body.login, req.body.password)
    authService.loginUser(req.body)
        .then((user) => {
            res.send({ authData: user })
        })
        .catch((error) => {
            res.send({ error: true, text: error })
            return
        })


    // return passport.authenticate('local', {
    //     successRedirect: '/',
    //     failureRedirect: '/login',
    //     successFlash   : false,
    //     failureFlash   : false
    // })

    // authService.loginUser(req.body)
    //     .then((successText) => {
    //         console.log('loginUser then: ', successText)
    //         res.send({error: false, text: successText})
    //     })
    //     .catch((error) => {
    //         res.send({error: true, text: error})
    //         return
    //     })
}

module.exports = loginController