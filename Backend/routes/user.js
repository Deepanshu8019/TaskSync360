const express = require("express")
const router = express.Router()

const { newAccount} = require("../Controllers/Account");
const {login} = require("../Controllers/Auth");
const {markTodoCompleted} = require("../Controllers/CompletedTodos");
const {verifyToken} = require("../Middleware/verify");

router.post("/login",login);
router.post("/newaccount",newAccount);
router.post("/:todoId/markTodoCompleted",markTodoCompleted);

module.exports = router;