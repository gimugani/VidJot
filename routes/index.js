var express = require('express');
var router = express.Router({mergeParams:true});
var passport = require('passport');


//INDEX ROUTE
router.get("/", (req, res) => {
	const title ="Welcome";
	res.render("index", {title: title});
});

//ABOUT ROUTE
router.get("/about", (req, res) => {
	res.render("about");
}); 


module.exports = router;