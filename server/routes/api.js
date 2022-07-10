const express = require('express')
const router = express.Router()

const loginController    = require('../controllers/loginController.js')



router.post('/auth/login', loginController)


router.post('/', function (req, res, next) {
    console.log('FAIL API RESPONSE')
    res.send('FAIL API RESPONSE')
})


// router.get('/auth/:id', function (req, res, next) {
//   res.send(req.params.id)
// })

module.exports = router