var express = require('express');
var router = express.Router();

router.get('/team/', function(req, res,next) {
  res.render('team');
});

module.exports = router;