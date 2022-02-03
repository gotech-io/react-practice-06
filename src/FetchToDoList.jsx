import { useReducer, useEffect } from 'react';
import ToDoList from './ToDoList';
import ToDoInput from './ToDoInput';
import api from './api';

const createStateObject = (todos, showCompleted) => {
  return {
    todos: todos,
    filteredTodos: showCompleted
      ? todos
      : todos.filter((todo) => !todo.isCompleted),
    showCompleted: showCompleted,
    nextId: Math.max(...todos.map((todo) => todo.id)) + 1,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'todos-loaded':
      return createStateObject(action.payload.todos, state.showCompleted);
    case 'todo-added':
      return createStateObject(
        [...state.todos, action.payload.newTodo],
        state.showCompleted
      );
    case 'todo-updated':
      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, isCompleted: action.payload.isCompleted };
        }
        return todo;
      });
      return createStateObject(newTodos, state.showCompleted);
    case 'filter-changed':
      return createStateObject(state.todos, action.payload.showCompleted);
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
};

const FetchToDoList = ({ showCompleted }) => {
  const [{ filteredTodos, nextId }, dispatch] = useReducer(reducer, {
    todos: [],
    filteredTodos: [],
    showCompleted,
    nextId: 0,
  });

  useEffect(() => {
    const fetchTodos = async () => {
      const remoteTodos = await api.readItems();
      dispatch({ type: 'todos-loaded', payload: { todos: remoteTodos } });
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    dispatch({ type: 'filter-changed', payload: { showCompleted } });
  }, [showCompleted]);

  const handleChange = async (id, newState) => {
    dispatch({ type: 'todo-updated', payload: { id, isCompleted: newState } });
    await api.updateItem(id, { isCompleted: newState });
  };

  const handleAdd = async (title) => {
    const newTodo = {
      id: nextId,
      title,
      isCompleted: false,
    };

    await api.createItem(newTodo);
    dispatch({ type: 'todo-added', payload: { newTodo } });
  };

  return (
    <>
      <ToDoList todos={filteredTodos} onChange={handleChange} />
      <ToDoInput onAdd={handleAdd} />
    </>
  );
};

export default FetchToDoList;
