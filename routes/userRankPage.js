const express = require("express");
const router = express.Router();

const Question = require("../models/question");
const User =  require("../models/user");

/* GET About Us page. */
router.get('/', function(req, res, next) {
	User.find()
        .exec()
        .then(docs => {        	
			res.render('userRankPage', { user: req.user, users: docs });
        })
        .catch(err => {
            console.log(err);
            res.status(200).json({
                error: err
        });
    }); 
});

router.get('/:tag', function(req, res) {
    const tag = req.params.tag;			//Java
    var fieldTag = getFieldWithTag(tag);	//tagJava
   
    switch(fieldTag){
        case "tagJava":
        User.find({ tagJava: { $gt: 0 } }).sort({ tagJava:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagPHP":
        User.find({ tagPHP: { $gt: 0 } }).sort({ tagPHP:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagPython":
        User.find({ tagPython: { $gt: 0 } }).sort({ tagPython:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagCPlusPlus":
        User.find({ tagCPlusPlus: { $gt: 0 } }).sort({ tagCPlusPlus:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagCSharp":
        User.find({ tagCSharp: { $gt: 0 } }).sort({ tagCSharp:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagRuby":
        User.find({ tagRuby: { $gt: 0 } }).sort({ tagRuby:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagLisp":
        User.find({ tagLisp: { $gt: 0 } }).sort({ tagLisp:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagProlog":
        User.find({ tagProlog: { $gt: 0 } }).sort({ tagProlog:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagHtml":
        User.find({ tagHtml: { $gt: 0 } }).sort({ tagHtml:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagCss":
        User.find({ tagCss: { $gt: 0 } }).sort({ tagCss:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagJavaScript":
        User.find({ tagJavaScript: { $gt: 0 } }).sort({ tagJavaScript:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagJade":
        User.find({ tagJade: { $gt: 0 } }).sort({ tagJade:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagC":
        User.find({ tagC: { $gt: 0 } }).sort({ tagC:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagFortran":
        User.find({ tagFortran: { $gt: 0 } }).sort({ tagFortran:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagVisualBasic":
        User.find({ tagVisualBasic: { $gt: 0 } }).sort({ tagVisualBasic:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
        case "tagAssembly":
        User.find({ tagAssembly: { $gt: 0 } }).sort({ tagAssembly:-1})
            .exec()
            .then(docs => {
                res.render('userRankPage', { user: req.user, tagName : tag, users: docs, tagField: fieldTag, showTable:"True" });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
            });
        }); 
        break;
       
    }   
});

function getFieldWithTag(tag) {
    var property = "tag";

    switch(tag) {
        case "C++":
            property += "CPlusPlus";
            break;
        case "C#":
            property += "CSharp";
            break;
        case "Visual Basic":
            property += "VisualBasic";
            break;
        default:
            property += tag;
            break;
    }

    return property;
}


module.exports = router;