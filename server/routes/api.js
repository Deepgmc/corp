const express = require('express')
const router = express.Router()

const companyController = require('../controllers/companyController')




router.post('/company/saveUserCompany', companyController.saveUserCompany)
router.get('/company/getUserCompany', companyController.getUserCompany)


router.post('/', function (req, res, next) {
    console.log('FAIL API RESPONSE')
    res.send('FAIL API RESPONSE')
})


// router.get('/auth/:id', function (req, res, next) {
//   res.send(req.params.id)
// })

module.exports = router