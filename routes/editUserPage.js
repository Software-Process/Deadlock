var express = require('express');
var router = express.Router();
const User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('editUserPage', {user : req.user });
});

router.patch('/', function(req, res, next) {
    const name = req.user.username;
    User.update({username : name},{$set: {bio : req.query.bio}})
        .exec()
        .then(function(result){
            res.render('userPage', {user : req.user });
        })
        .catch(function(err){
            console.log(err);
            res.status(500).json({error:err});
        });
});

module.exports = router;
