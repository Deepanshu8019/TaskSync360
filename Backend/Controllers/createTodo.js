const Todos = require("../model/Todos");

exports.CreateTodo = async (req, res) => {
    // Extract todo details from the request body
    const { title } = req.body;
    // console.log("title : ",title);
    // Check if the title field is provided and not empty
    if (!title || title.trim() === '') {
        return res.status(400).json({ message: 'Todo title is required' });
    }

    const userID = req.user.userID;

    try {
        // Create a new todo instance
        const newTodo = new Todos({ userID, title });

        // Save the todo to the database
        await newTodo.save();

        // Return a success response
        return res.status(201).json({ success: true, message: 'Todo created successfully', todo: newTodo });
    } catch (error) {
        // Handle any errors
        console.error('Error creating todo:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
