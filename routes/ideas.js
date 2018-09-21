var express = require('express');
var router = express.Router({mergeParams:true});
var passport = require('passport');
var Idea = require("../models/idea");
var middleware = require('../middleware');

// INDEX
router.get("/", middleware.isLoggedIn, (req, res) => {
	console.log(req.user.id);
	Idea.find({user : req.user.id}, function(err, allIDeas){
		if(err){
			req.flash("error", "No Idea Found!");
			console.log(err);
		} else {
			res.render("ideas/index", {ideas: allIDeas});
		}
	});
});

// NEW IDEA
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("ideas/new");
});

// CREATE IDEA
router.post("/", middleware.isLoggedIn, (req, res) => {
	var idea = req.body.idea;
	// var author = {
 //      id: req.user._id,
 //      username: req.user.name
 //  	};	
 	var user = req.user.id;
  	var newIdea = {user: user, details: idea.details, title: idea.title};
	Idea.create(newIdea, function(err, newlyCreated){
		if (err || !newlyCreated){
			req.flash("error", "Please Fill In the Form!!");
			console.log(err);
			res.redirect("/ideas/new");
		} else {
			req.flash('success', "Successfully Created an Idea!!")
			res.redirect("/ideas");
		}	
	});
});

// EDIT IDEA
router.get("/:id/edit", middleware.checkIdeaOwnership, (req, res) => {
	Idea.findById(req.params.id, function(err, foundIdea){
		if (err) console.log(err)
		else {
			res.render("ideas/edit", {idea: foundIdea});
		}
	});
});

// UPDATE IDEA
router.put("/:id", middleware.checkIdeaOwnership, (req, res) => {
	Idea.findByIdAndUpdate(req.params.id, req.body.idea, function(err, idea){
		if (err){
			console.log(err);
			res.redirect("back");
		} else {
			req.flash('success', "Successfully Updated an Idea!!")
			res.redirect("/ideas");
		}
	});
});

// DELETE IDEA
router.delete("/:id", middleware.checkIdeaOwnership, (req, res) => {
	Idea.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			req.flash('success', "Successfully Deleted an Idea!!")
			res.redirect("back");
		}
	});
});

module.exports = router;
