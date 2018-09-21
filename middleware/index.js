var Idea = require("../models/idea");

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkIdeaOwnership = function checkIdeaOwnership(req, res, next){
    // is user logged in
    if (req.isAuthenticated()){
        Idea.findById(req.params.id, function(err, foundIdea){
        if (err || !foundIdea){
            req.flash("error", "Idea not found");
            res.redirect("back");
        } else {
            //does user own the idea?
            if(foundIdea.user == req.user.id){
                next();
            } 
            //otherwise, redirect
            else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("back");
            }
        }
    });
    // if not, redirect
    } else {
       req.flash("error", "You must log in first!");
       res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must log in first!");
    res.redirect("/users/login");
}

module.exports = middlewareObj;