const express = require('express')
const router = express.Router()


router.get('/auth', function (req, res, next) {
  console.log('(auth.js) get /')
  res.send({ token: 'XXXXXXXXXXXXXXXXXXXXXXX' })
})

router.get('/auth/:id', function (req, res, next) {
  res.send(req.params.id)
})

module.exports = router