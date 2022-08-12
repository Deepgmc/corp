const express = require('express')
const router = express.Router()

const loginController    = require('../controllers/auth/loginController.js')
const logoutController   = require('../controllers/auth/logoutController.js')
const registerController = require('../controllers/auth/registerController.js')
const userInfoController = require('../controllers/auth/userInfoController.js')
//const auth               = require('../services/authService.js')



router.post('/auth/login', loginController)

router.post('/auth/register', registerController.register)

router.post('/auth/get_user_info', userInfoController)

router.post('/auth/logout', logoutController)

router.get('/auth/checkUserAuth', registerController.checkUserAuth)


router.post('/', function (req, res, next) {
    console.log('FAIL AUTH RESPONSE')
    res.send('FAIL AUTH RESPONSE')
})


// router.get('/auth/:id', function (req, res, next) {
//   res.send(req.params.id)
// })

module.exports = router