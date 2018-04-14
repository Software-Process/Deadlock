const express = require("express");
const router = express.Router();
const User = require("../models/user");

/* GET edit user profile page. */
router.get("/", function (req, res, next) {
    res.render("editUserPage", {user: req.user});
});

/* Submit changes to use profile via PATCH request. */
router.patch("/", function (req, res, next) {
    const name = req.user.username;
    User.update({username: name},
        {
            $set: {
                bio: req.body.bio,
                email: req.body.email,
                phoneNumber: req.body.phone,
                github: req.body.gitpage,
                linkedin: req.body.linkedin,
                city: req.body.city,
                country: req.body.country,
                fullName: req.body.name,
                age: req.body.age,
                birthday: req.body.birthday,
                spokenLanguage: req.body.spokenLanguage,
                programmingLanguage: req.body.programmingLanguage,
                bannerColor: req.body.banner,
                gender: req.body.gender,
                picture: req.body.profilePicture
            }
        })
        .exec()
        .then(function (result) {
            res.render("userPage", {user: req.user}, function (err, resp) {
                res.redirect("userPage");
            });
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;
