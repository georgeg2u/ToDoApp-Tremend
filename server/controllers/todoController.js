const TodoModel = require("../models/todoModel");
const {validateTodo} = require("../utils/validationUtils");

const createTodo = async (req, res) => {
  try {
    const {error} = validateTodo(req.body);
    if (error) {
      return res.status(400).send({message: error.details[0].message});
    }
    const existingTodo = await TodoModel.findOne({title: req.body.title});
    if (existingTodo) {
      return res
        .status(409)
        .send({message: "Todo with this title already exists."});
    }

    const newTodo = await new TodoModel({
      ...req.body,
    }).save();

    res
      .status(201)
      .send({title: newTodo.title, description: newTodo.description});
  } catch (error) {
    res.status(500).send({message: "Internal server error"});
  }
};

const getAllTodos = async (req, res) => {
  try {
    const allTodos = await TodoModel.find({userId: req.body.userId}, "-__v");
    res.status(200).send(allTodos);
  } catch (error) {
    res.status(500).send({message: "Internal server error"});
  }
};

const getPagedTodos = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const pagedTodos = await TodoModel.find({}, "-__v")
      .skip(offset)
      .limit(limit);

    res.status(200).send(pagedTodos);
  } catch (error) {
    res.status(500).send({message: "Internal server error"});
  }
};

const getTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await TodoModel.findById(id, "-__v");
    if (!todo) {
      return res
        .status(404)
        .send({message: "Todo with given id does not exist."});
    }

    res.status(200).send(todo);
  } catch (error) {
    if (error.name === "CastError") {
      return res
        .status(404)
        .send({message: "Todo with given id does not exist."});
    }
    console.error(error);
    res.status(500).send({message: "Internal server error"});
  }
};

const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const {title} = req.body;

    const existingTodoWithSameName = await TodoModel.findOne({title});

    if (existingTodoWithSameName && existingTodoWithSameName._id != id) {
      return res.status(409).send({message: "Another todo with this title already exist. Please choose another title."});
    }

    const existingTodo = await TodoModel.findById({_id: id}, "-__v");
    if (!existingTodo) {
      return res.status(404).send({message: "Todo not found."});
    }

    existingTodo.title = req.body.title || existingTodo.title;
    existingTodo.description = req.body.description || existingTodo.description;

    const updatedTodo = await existingTodo.save();

    res.status(200).send(updatedTodo);
  } catch (error) {
    if (error.name === "CastError") {
      return res
        .status(404)
        .send({message: "Todo with given id does not exist."});
    }
    console.log(error);
    res.status(500).send({message: "Internal server error"});
  }
};

const deleteTodo = async (req, res) => {
  try {
      const id = req.params.id;
      const deletedTodo = await TodoModel.findOneAndDelete({_id: id})

      if (!deletedTodo) {
        return res.status(404).send({message: "Todo not found."})
      }

      res.status(200).send({message: "Todo deleted successfully"})
  } catch (error) {
    if (error.name === "CastError") {
      return res
        .status(404)
        .send({message: "Todo with given id does not exist."});
    }
    console.log(error)
    res.status(500).send({message: "Internal server error"})
  }
}

module.exports = {createTodo, getAllTodos, getPagedTodos, getTodo, updateTodo, deleteTodo};
