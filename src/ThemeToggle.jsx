import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext, themeNames } from './themeContext';
import styled from '@emotion/styled/macro';
import Toggle from './Toggle';

const ToggleContainer = styled.div`
  top: 18px;
  right: 6px;
  position: absolute;
  transform: rotate(270deg);
`;

const ThemeToggle = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  const toggleTheme = (checked) => {
    changeTheme(
      theme.name === themeNames.light ? themeNames.dark : themeNames.light
    );
  };

  return (
    <ToggleContainer>
      <Toggle
        theme={{ ...theme, checkboxColor: '#ddd561' }}
        type="checkbox"
        checked={theme.name === themeNames.light}
        onChange={(e) => {
          toggleTheme(e.currentTarget.checked);
        }}
      />
    </ToggleContainer>
  );
};

ThemeToggle.propTypes = {
  initialState: PropTypes.bool.isRequired,
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

ThemeToggle.defaultProps = {
  initialState: false,
  onChange: (checked) => {},
};

export default ThemeToggle;
