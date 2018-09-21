var express = require('express');
var router = express.Router({mergeParams:true});
var passport = require('passport');
var User = require("../models/user");

//LOGIN ROUTE
router.get("/login", (req, res) => {
	res.render("login");
});

//HANDLING LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/ideas", 
        failureRedirect:"/users/login",
        failureFlash: true
    }), function(req, res){
})

//REGISTER ROUTE
router.get("/register", (req, res) => {
	res.render("register");
});

//HANDLE SIGNUP LOGIC
router.post("/register", function(req, res){
    var newUser = new User({
    						name: req.body.name,
    						email: req.body.email
    					}); 
    User.register(newUser,req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message); 
            return res.redirect("/users/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Hello, " + user.name);
            res.redirect("/");
        });
    });
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

module.exports = router;