import { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled/macro';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from './themeContext';
import Checkbox from './Checkbox';
import api from './api';

const BackButton = styled.a`
  display: inline-block;
  cursor: pointer;
  padding: 8px 12px;
  font-size: 14px;
  margin-bottom: 6px;
  text-decoration: underline;
  color: ${({ theme }) => theme.textColor};
`;

const ToDoItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  color: ${({ theme }) => theme.textColor};
`;

const Title = styled.div`
  flex-grow: 1;
  padding: 0 8px;
`;

const Icon = styled.div`
  font-size: 20px;
  cursor: pointer;
`;

const ToDoItemPage = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [todo, setTodo] = useState(location.state.todo);
  const itemId = parseInt(params.itemId);

  useEffect(() => {
    const fetchTodo = async () => {
      const remoteTodo = await api.readItem(itemId);
      setTodo(remoteTodo);
    };
    fetchTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleChange = async (e) => {
    const newState = e.currentTarget.checked;

    await api.updateItem(itemId, { isCompleted: newState });
    const newTodo = { ...todo, isCompleted: newState };
    navigate(location.pathname, { replace: true, state: { todo: newTodo } });
    setTodo(newTodo);
  };

  const handleDelete = async () => {
    await api.deleteItem(itemId);
    navigate('/');
  };

  return (
    <>
      <BackButton theme={theme} href={'/'}>
        {'<'} All Todos
      </BackButton>
      <ToDoItemContainer theme={theme}>
        {todo && (
          <>
            <Checkbox
              type="checkbox"
              checked={todo.isCompleted}
              onChange={handleChange}
            />
            <Title>{todo.title}</Title>
            <Icon onClick={handleDelete}>🗑</Icon>
          </>
        )}
      </ToDoItemContainer>
    </>
  );
};

export default ToDoItemPage;
