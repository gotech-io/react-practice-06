import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { ThemeContext } from './themeContext';
import styled from '@emotion/styled/macro';

const ToDoInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const AddButton = styled.button`
  background: ${({ theme }) => theme.buttonColor};
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  margin: 4px;
  height: 33px;
  width: 33px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;
  :disabled {
    cursor: not-allowed;
    opacity: 0.7;
    color: ${({ theme }) => theme.disabledTextColor};
  }
`;

const AddInput = styled.input`
  flex-grow: 1;
  padding: 8px 12px;
  margin: 8px 6px;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const ToDoInput = ({ onAdd }) => {
  const [text, setText] = useState('');
  const { theme } = useContext(ThemeContext);

  const handleAdd = (e) => {
    setText('');
    onAdd(text);
  };
  return (
    <ToDoInputContainer>
      <AddInput
        type="text"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        theme={theme}
      />
      <AddButton disabled={!text} onClick={handleAdd} theme={theme}>
        +
      </AddButton>
    </ToDoInputContainer>
  );
};

ToDoInput.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

ToDoInput.defaultProps = {
  onAdd: (text) => {},
};

export default ToDoInput;
