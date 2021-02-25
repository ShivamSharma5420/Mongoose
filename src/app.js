const mongoose = require('mongoose');

//connection creation and creating a new DB
mongoose.connect("mongodb://localhost:27017/bookStore", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("mongoDB connected"))
    .catch((err) => console.log(err))



//schema
//A Mongoose Schema defines the structure of the document, default values, validations, etc.

const bookSchema = new mongoose.Schema({
    book_id: { type: Number, required: true, min: 0 },

    book_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: [3, "Length shoul be 3 or greater"],
        maxlength: [10]
    },

    author_name: String,

    publish_date: { type: Date, default: Date.now },

    genre: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["drama", "thrill", "suspense", "action", "comedy", "fiction"]
    }
});


//Mongoose Model is just a wrapper on a mongoose schema
//provide an interface to the database for creating, quering , updating,deleting records, etc.

//Collection creation
const Book = new mongoose.model('Book', bookSchema);



//creating and inserting doc


const createDocument = async () => {
    try {
        const firstBook = new Book({
            book_id: -1,
            book_name: "FBn",
            author_name: "FirstBookAuthor",
            genre: "Fiction"
        });

        const result = await firstBook.save();
        console.log(result);
    } catch (err) {
        console.log(err);
    }

}
//createDocument();



const createManyDocument = async () => {
    try {
        const testBook1 = new Book({
            book_id: 2,
            book_name: "TestBook2",
            author_name: "TestBookAuthor2",
            genre: "Fiction"
        });

        const testBook2 = new Book({
            book_id: 3,
            book_name: "TestBook3",
            author_name: "TestBookAuthor3",
            genre: "Fiction"
        });

        const testBook3 = new Book({
            book_id: 4,
            book_name: "TestBook4",
            author_name: "TestBookAuthor4",
            genre: "Fiction"
        });

        const result = await Book.insertMany([testBook1, testBook2, testBook3]);
        console.log(result);
    } catch (err) {
        console.log(err);
    }

}
//createManyDocument();




const getDocument = async () => {

    try {

        const result = await Book.find({ genre: "Fiction" }).sort({ book_id: -1 }).countDocuments();
        console.log(result);

    } catch (err) {
        console.log(err);
    }

}

//getDocument();


const updateDocument = async (name) => {

    try {

        const result = await Book.updateOne({ book_name: name }, { $set: { author_name: "Modified" } });
        console.log(result);

    } catch (err) {
        console.log(err);
    }

}

//updateDocument("TestBook3");

const deleteDocument = async (id) => {

    try {

        const result = await Book.deleteOne({ book_id: id });
        console.log(result);

    } catch (err) {
        console.log(err);
    }

}

//deleteDocument(1);
createDocument();