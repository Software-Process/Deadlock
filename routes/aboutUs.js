var express = require('express');
var router = express.Router();

/* GET About Us page. */
router.get('/', function(req, res, next) {
	res.render('aboutus');
});

module.exports = router;