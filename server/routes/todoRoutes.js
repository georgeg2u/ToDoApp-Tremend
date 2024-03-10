const router = require("express").Router();
const {authenticateToken} = require("../controllers/authController");
const {
  createTodo,
  getAllTodos,
  getPagedTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.use(authenticateToken);

router.post("/", createTodo);
router.get("/", getAllTodos);
router.get("/paged-todos", getPagedTodos);
router.get("/:id", getTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
