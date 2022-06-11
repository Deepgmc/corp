const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', function(req, res, next) {
  console.log('render nodejs api');
  res.send({text: 'respond with a resource'});
});

module.exports = router;