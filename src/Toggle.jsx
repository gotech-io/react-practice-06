import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import { useState } from 'react';

const CheckboxWrapper = styled.span`
  position: relative;
  display: inline-block;
`;

const CheckboxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const Checkbox = styled.input`
  display: inline-block;
  vertical-align: middle;
  margin: 0;
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckboxLabel} {
    background: ${({ theme }) => theme.checkboxColor};
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

const CheckboxText = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin: 0 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.textColor};
`;

const Toggle = ({ onChange, checked, theme, text }) => {
  const [id] = useState(() => `toggle-${Math.random().toString(16).slice(2)}`);

  return (
    <CheckboxWrapper>
      <Checkbox
        id={id}
        type="checkbox"
        onChange={onChange}
        checked={checked}
        theme={theme}
      />
      <CheckboxLabel htmlFor={id} />
      {text && <CheckboxText theme={theme}>{text}</CheckboxText>}
    </CheckboxWrapper>
  );
};

Toggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  checked: PropTypes.bool,
  text: PropTypes.string,
};

export default Toggle;
