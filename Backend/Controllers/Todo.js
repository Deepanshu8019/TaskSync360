// Route to fetch user's todos
const Todos = require("../model/Todos")

exports.AllTodos = async (req, res) => {
  try {
    // Fetch user's todos from the database based on user ID (req.user._id)
    const todos = await Todos.find({ userID: req.user.userID });
    // Return the todos data as JSON response
    return res.json(todos);
  } catch (error) {
    console.error('Error fetching user\'s todos:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteTodo = async (req, res) => {
  // console.log("hitting delete Todo controller");
  try {
    const userID = req.user.userID;
    const todoID = req.params.id.trim();

    const todo = await Todos.findOne({ _id: todoID });

    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo does not exist' });
    }

    if (userID.toString() !== todo.userID.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await Todos.findOneAndDelete({ _id: todoID });

    return res.status(200).json({ success: true, message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error in deleting todo: ', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

exports.editTodo = async (req, res) => {
  console.log("hitting delete Todo controller");
  try {
    const userID = req.user.userID;
    const todoID = req.params.id.trim();
    const { title } = req.body;

    // Find the todo by ID
    const todo = await Todos.findById(todoID);

    // Check if the todo exists
    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo does not exist' });
    }

    // Check if the user is authorized to edit the todo
    if (userID.toString() !== todo.userID.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    // Update the title of the todo
    await Todos.findByIdAndUpdate(todoID, { title });

    return res.status(200).json({ success: true, todo, message: 'Todo updated successfully' });

  } catch (error) {
    console.error('Error in editTodo:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
