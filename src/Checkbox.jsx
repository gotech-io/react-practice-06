import styled from '@emotion/styled/macro';
import { useContext } from 'react';
import { ThemeContext } from './themeContext';

const CheckboxContainer = styled.span`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 24px;
  height: 24px;
`;

const CheckboxInput = styled.input`
  appearance: none;
  width: 100%;
  height: 100%;
  border: 1px solid #a9a9a9;
  border-radius: 1px;
  outline: none;
  margin: 0;
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.checkboxColor};
    border-color: ${({ theme }) => theme.checkboxColor};

    &:hover {
      box-shadow: 0 0 0 3px #d9d9d9;
    }
  }

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==');
    background-size: 40px;
    background-repeat: no-repeat;
    background-position: center;
  }

  &:hover {
    box-shadow: 0 0 0 3px #d9d9d9;
  }
`;

const Checkbox = (props) => {
  const { label, name, onChange, value, checked, ...rest } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <CheckboxContainer>
      <CheckboxInput
        theme={theme}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
        {...rest}
      />
    </CheckboxContainer>
  );
};

export default Checkbox;
