const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://jonelvillaver735:${encodeURIComponent(
	password
)}@cluster0.was36.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0
`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
// 	content: "Mongoose makes things easy",
// 	important: true,
// });

// note.save().then((result) => {
// 	console.log("note saved!");
// 	mongoose.connection.close();
// });

// ({}) GETS ALL THE NOTES STORED IN THE NOTES COLLECTION
// Note.find({}).then((result) => {
// 	result.forEach((note) => {
// 		console.log(note);
// 	});
// 	mongoose.connection.close();
// });

//  ({ important: true }) FETCHES ONLY THE IMPORTANT NOTES
Note.find({ important: true }).then((result) => {
	result.forEach((note) => console.log(note));
	mongoose.connection.close();
});
