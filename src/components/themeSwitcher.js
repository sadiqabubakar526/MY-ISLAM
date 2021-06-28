import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeManagerContext } from 'gatsby-styled-components-dark-mode';

const Container = styled.div`
  padding: 5px;
  .theme-switch-wrapper {
    display: flex;
    align-items: center;
  }
  .theme-switch {
    display: inline-block;
    height: 24px;
    position: relative;
    width: 40px;
  }

  .theme-switch input {
    display: none;
  }

  .slider {
    background-color: #ccc;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.4s;
  }

  .slider:before {
    background-color: #fff;
    bottom: 4px;
    content: '';
    height: 17px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 17px;
  }

  input:checked + .slider {
    background-color: ${(props) => props.theme.primaryColor};
  }

  input:checked + .slider:before {
    transform: translateX(17px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

function ThemeSwitcher() {
  const themeContext = useContext(ThemeManagerContext);
  return (
    <Container>
      <div className="theme-switch-wrapper">
        <label className="theme-switch" htmlFor="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            onChange={() => themeContext.toggleDark()}
            checked={themeContext.isDark}
          />
          <div className="slider round"></div>
        </label>
      </div>
    </Container>
  );
}

export default ThemeSwitcher;
