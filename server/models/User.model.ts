const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
  },
  image: String,
  tvShows: { type: Array },
  movies: { type: Array },
});

mongoose.model("users", userSchema);
