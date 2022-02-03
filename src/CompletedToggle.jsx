import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { ThemeContext } from './themeContext';
import styled from '@emotion/styled/macro';
import Toggle from './Toggle';

const ToggleContainer = styled.div`
  display: block;
  text-align: start;
  margin: 0 6px;
`;

const CompletedToggle = ({ initialState, text, onChange }) => {
  const [isActive, setIsActive] = useState(initialState);
  const { theme } = useContext(ThemeContext);

  return (
    <ToggleContainer>
      <Toggle
        theme={theme}
        type="checkbox"
        checked={isActive}
        onChange={(e) => {
          setIsActive(e.currentTarget.checked);
          onChange(e.currentTarget.checked);
        }}
        text={text}
      />
    </ToggleContainer>
  );
};

CompletedToggle.propTypes = {
  initialState: PropTypes.bool.isRequired,
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

CompletedToggle.defaultProps = {
  initialState: false,
  onChange: (checked) => {},
};

export default CompletedToggle;
