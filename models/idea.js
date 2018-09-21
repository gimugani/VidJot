const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
	title: {
		type: String, 
		required: true
	}, 
	details: {
		type: String, 
		required: true
	}, 
	date: {
		type: Date, 
		default: Date.now
	},
	// author: {
	//         id: {
	//             type: mongoose.Schema.Types.ObjectId,
	//             ref: "User"
	//         },
	//         username: String
 //    }, 
 	user : {
 		type: String, 
 		required: true
 	}
});

module.exports = mongoose.model("Idea", IdeaSchema);
