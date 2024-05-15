const Todo = require('../model/Todos'); // Import the Todo model

// Object to store timeout IDs for each todo
const timeoutMap = {};

// Function to schedule the deletion of a todo after a delay
function scheduleDeletion(todoId, delay) {
  timeoutMap[todoId] = setTimeout(async () => {
    try {
      // Find the todo in the database
      const todo = await Todo.findById(todoId);

      // Check if the todo exists and is still marked as completed
      if (todo && todo.completed) {
        // Delete the todo from the database
        await Todo.findByIdAndDelete(todoId);
        console.log(`Todo with ID ${todoId} deleted after ${delay} milliseconds`);
      }

      // Remove the timeout ID from the map
      delete timeoutMap[todoId];
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }, delay);
}

// Function to cancel the scheduled deletion of a todo
function cancelDeletion(todoId) {
  if (timeoutMap[todoId]) {
    clearTimeout(timeoutMap[todoId]);
    delete timeoutMap[todoId];
  }
}

// Controller function to mark a todo as completed
const markTodoCompleted = async (req, res) => {
  // Extract todo ID from the request parameters
  const todoId = req.params.id.trim();

  try {
    // Find the todo in the database
    const todo = await Todo.findById(todoId);

    // Check if the todo exists
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if the todo is already completed
    if (todo.completed) {
      // If the todo is already completed, cancel the scheduled deletion
      cancelDeletion(todoId);
      todo.completed = false;
      todo.completedAt = null;
      await todo.save();
      // console.log("todo marked as incompleted")
      return res.status(200).json({ success: true, message: 'Todo is marked as incomplete', todo });
    }

    // Mark the todo as completed
    // console.log("todo marked as completed")
    todo.completed = true;
    todo.completedAt = new Date();

    // Save the updated todo to the database
    await todo.save();

    // Schedule deletion of the completed todo after one hour
    const delay = 3600000; // 3600000 milliseconds = 1 hour
    scheduleDeletion(todoId, delay);

    // Return a success response
    return res.status(200).json({ success: true, message: 'Todo marked as completed', todo });
  } catch (error) {
    // Handle any errors
    console.error('Error marking todo as completed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { markTodoCompleted };
