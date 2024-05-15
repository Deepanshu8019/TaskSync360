const express = require("express")
const router = express.Router()

const {AllTodos,deleteTodo,editTodo} = require("../Controllers/Todo");
const {CreateTodo} = require("../Controllers/createTodo");
const {markTodoCompleted} = require("../Controllers/CompletedTodos");
const {verifyToken} = require("../Middleware/verify");

router.post("/todos",verifyToken,AllTodos);
router.post("/createTodo",verifyToken,CreateTodo);
router.delete("/deleteTodo/:id",verifyToken,deleteTodo);
router.put("/completed/:id",verifyToken,markTodoCompleted);
router.put("/editTodo/:id",verifyToken,editTodo);
  
module.exports = router;