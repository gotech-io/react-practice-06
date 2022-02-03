import { useState, useEffect } from 'react';
import ToDoList from './ToDoList';
import ToDoInput from './ToDoInput';
import api from './api';

const FetchToDoList = ({ showCompleted }) => {
  const [todos, setTodos] = useState();
  const [filteredTodos, setFilteredTodos] = useState();

  useEffect(() => {
    const fetchTodos = async () => {
      const remoteTodos = await api.readItems();
      setTodos(remoteTodos);
    };
    fetchTodos();
  }, []);

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

    await api.updateItem(id, { isCompleted: newState });
    setTodos(newTodos);
  };

  const handleAdd = async (title) => {
    const newTodo = {
      id: Math.max(...todos.map((todo) => todo.id)) + 1,
      title,
      isCompleted: false,
    };

    await api.createItem(newTodo);
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
