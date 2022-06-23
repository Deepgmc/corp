const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController.js')
const registerController = require('../controllers/registerController.js')


//router.get('/auth', authController)
router.post('/auth/login', loginController)
router.post('/auth/register', registerController)


router.post('/', function (req, res, next) {
    console.log('FAIL API RESPONSE')
    res.send('FAIL API RESPONSE')
})


// router.get('/auth/:id', function (req, res, next) {
//   res.send(req.params.id)
// })

module.exports = router