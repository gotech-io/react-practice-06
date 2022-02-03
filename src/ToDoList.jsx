import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';
import { useContext } from 'react';
import { ThemeContext } from './themeContext';
import styled from '@emotion/styled/macro';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 12px 6px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const ToDoList = ({ todos, onChange }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <List theme={theme}>
      {todos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} onChange={onChange} />
      ))}
    </List>
  );
};

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

ToDoList.defaultProps = {
  todos: [],
  onChange: (id, newState) => {},
};

export default ToDoList;
