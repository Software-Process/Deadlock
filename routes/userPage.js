var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req);
    if (req.user){
        res.render('userpage', {user : req.user });
    } else {
        res.render('signIn');
    }
});

module.exports = router;