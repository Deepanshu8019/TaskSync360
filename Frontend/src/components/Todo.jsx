import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

function Todo({ todo, setTodos, setEditTodo }) {
  const [Checked, setChecked] = useState(todo.completed);

  const deleteHandler = async () => {
    try {
      // Fetch token from localStorage
      const token = localStorage.getItem('token');
      // Validate token
      if (!token) {
        console.error('Token not found');
        return;
      }

      const response = await fetch(`https://tasksync360.onrender.com/api/v1/deleteTodo/${todo._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      const data = await response.json();

      // Remove the deleted todo from the UI or update the state
      setTodos(prevTodos => prevTodos.filter(item => item._id !== todo._id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const editHandler = () => {
    // Set the todo to be edited
    setEditTodo(todo);
    deleteHandler();
  };

  const handleChange = async (event) => {
    try {
      // Fetch token from localStorage
      const token = localStorage.getItem('token');
      // Validate token
      if (!token) {
        console.error('Token not found');
        return;
      }

      setChecked(!Checked);

      // Send a PUT request to update the completion status of the todo
      const response = await fetch(`https://tasksync360.onrender.com/api/v1/completed/${todo._id}`, {
        method: 'PUT', // Change the method to PUT
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error('Operation failed');
      }
    } catch (error) {
      console.error('Error toggling todo completion status:', error);
    }
  };

  return (
    <div >
      <div className='flex items-center justify-center text-pretty bg-pink-200 m-1'>
        <span className='w-30 mr-4 checkbox-wrapper-11'>
            <input
              id={todo._id}
              type="checkbox"
              onChange={handleChange}
              checked={Checked}
            />
            <label htmlFor={todo._id}>To-do</label>
          </span>
        <div className='w-2/3 text-pretty flex flex-wrap poetsen-one-regular hover:text-balance text-2xl'><span>{todo.title}</span></div>
        <span className='m-3'>
          <button onClick={deleteHandler} className='flex items-center justify-center'><MdDeleteForever className='text-black text-3xl' /></button>
        </span>
        <span className=''>
          <button onClick={editHandler} className='flex items-center justify-center'><FiEdit className='text-black text-2xl' /></button>
        </span>
      </div>
    </div>
  );
}

export default Todo;
