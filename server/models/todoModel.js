const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: {
    type:String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const TodoModel = mongoose.model("todos", todoSchema);

module.exports = TodoModel;
