import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import '../index.css'
import BackgroundChanger from './BackgroundChanger';

function Todos() {

  const { register, handleSubmit, reset } = useForm();

  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState({ title: '' });
  const [backgroundImage, setBackgroundColor] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      if (!token) {
        console.error('Token not found');
        return;
      }

      const response = await fetch('https://tasksync360.onrender.com/api/v1/todos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  const onSubmit = async (formData) => {
    try {
      if (!token) {
        console.error('Token not found');
        return;
      }

      const response = await fetch('https://tasksync360.onrender.com/api/v1/createTodo', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      const data = await response.json();

      fetchTodos();
      reset();
      setEditTodo({ title: '' });

    } catch (error) {
      console.error('Error creating todo:', error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (editTodo.title.trim() !== '') {
        onSubmit(editTodo);
      } else {
        console.error('Todo title cannot be empty');
      }
    }
  };

  return (
    <div className='w-screen min-h-screen todo-wrapper' style={{ backgroundImage: backgroundImage }} >
      <h1 className='text-3xl font-bold underline  text-black flex items-center justify-center p-8 header'>Todo List</h1>
      <div className="w-full h-px bg-black"></div>
      <div className='h-max '>
        <div className=' m-2 flex items-center justify-center'>
          <form onSubmit={handleSubmit(onSubmit)} className=' todo-text-wrapper flex flex-wrap items-center'>
            <span className="input">
              <input type="text" placeholder="New Todo"
                {...register('title')}
                value={editTodo.title || ''}
                onChange={(e) => {
                  setEditTodo({ title: e.target.value });
                }}
                onKeyDown={handleKeyPress}
                className='todo-field'
              />
              <span className='input-wrapper'></span>
            </span>
            <button type="submit" className="button-64 m-10" role="button"><span className="text">Add Todo</span></button>
          </form>
        </div>

        <div className='w-full flex items-center justify-center'>
          <div className=' todos text-white bg-pink-400'>
            {todos.map((todo) => (
              <Todo key={todo._id} todo={todo} setTodos={setTodos} setEditTodo={setEditTodo} />
            ))}
          </div>
        </div>
      </div>

      <div className='w-full '>
        <BackgroundChanger setBackgroundColor={setBackgroundColor} />
      </div>

    </div>
  );
}

export default Todos;
