const 	express 	= require('express'),
		app 		= express(),
		exphbs 		= require('express-handlebars'),
 		mongoose 	= require('mongoose'),
 		bodyParser 	= require('body-parser'),
	   	User        = require('./models/user'),
	   	Idea		= require('./models/idea'),
    	passport    = require('passport'),
    	session		= require('express-session'),
    	LocalStrategy = require('passport-local'),
    	methodOverride = require('method-override'),
    	flash       = require('connect-flash');

//requiring routes    
var ideaRoutes       = require('./routes/ideas'),
    userRoutes    = require('./routes/users'),
    indexRoutes         = require('./routes/index');

var uri = process.env.DATABASEURL || "mongodb://localhost/vidjot" 
mongoose.connect(uri, { useNewUrlParser: true })
		.then(() => console.log('MongoDB Connected...'))
		.catch(err => console.log(err)); 

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method")); 
app.use(flash());

app.use(session({
    secret: "I love Hana and Han",
    resave: false, 
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Variables
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

const port = 3000;

//app.engine("handlebars", exphbs({defaultLayout: 'main'}));
//app.set("view engine", "handlebars");

app.use("/", indexRoutes);
app.use("/ideas",ideaRoutes);
app.use("/users", userRoutes);

app.listen(port, function(){
	console.log(`Server started on port ${port}`);
});