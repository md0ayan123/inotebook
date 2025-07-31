const mongoose = require('mongoose');

async function connectToMongo() {
  try {
    await mongoose.connect("mongodb+srv://mdayan835:eQGYJ0f6NjKXvvzz@inotebook-db.6fbtczs.mongodb.net/inotebook");
    console.log('Mongodb connection successfully');
    
  } catch (error) {
    console.error("Something went wrong:", error.message);
  }
}

connectToMongo();

module.exports = mongoose;

