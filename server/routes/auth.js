const express = require('express')
const router = express.Router()
//const passport = require('passport')

const loginController    = require('../controllers/loginController.js')
const logoutController    = require('../controllers/logoutController.js')
const registerController = require('../controllers/registerController.js')
const auth               = require('../services/authService.js')


//auth.initPassportLocal()

router.post('/auth/login', loginController)
// router.post('/auth/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     successFlash   : false,
//     failureFlash   : false
// }))
router.post('/auth/register', registerController)

router.post('/auth/logout', logoutController)


router.post('/', function (req, res, next) {
    console.log('FAIL API RESPONSE')
    res.send('FAIL API RESPONSE')
})


// router.get('/auth/:id', function (req, res, next) {
//   res.send(req.params.id)
// })

module.exports = router