import { useState, useEffect } from 'react';
import ToDoList from './ToDoList';
import ToDoInput from './ToDoInput';

const FetchToDoList = ({ url, showCompleted }) => {
  const [todos, setTodos] = useState();
  const [filteredTodos, setFilteredTodos] = useState();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(url);
      const remoteTodos = await response.json();
      setTodos(remoteTodos);
    };
    fetchTodos();
  }, [url]);

  useEffect(() => {
    if (showCompleted) {
      setFilteredTodos(todos);
    } else {
      setFilteredTodos(todos.filter((todo) => !todo.isCompleted));
    }
  }, [todos, showCompleted]);

  const handleChange = async (id, newState) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: newState };
      }
      return todo;
    });

    await fetch(`${url}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isCompleted: newState }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    setTodos(newTodos);
  };

  const handleAdd = async (title) => {
    const newTodo = {
      id: Math.max(...todos.map((todo) => todo.id)) + 1,
      title,
      isCompleted: false,
    };

    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    setTodos([...todos, newTodo]);
  };

  return (
    <>
      <ToDoList todos={filteredTodos} onChange={handleChange} />
      <ToDoInput onAdd={handleAdd} />
    </>
  );
};

export default FetchToDoList;
