import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import breakPoints from './breakpoints';

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  @media screen and (max-width: ${breakPoints.S}) {
    flex-flow: column nowrap;
    padding-left: 0;
    background-color: ${(props) => props.theme.secondaryColor};
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      padding: 20px;
    }
    li > a > button {
      background: none;
      border: none;
      font-size: 20px;
      transition: transform 0.3s ease-out;
      color: ${(props) => props.theme.textColor};
      &:hover {
        color: ${(props) => props.theme.primaryColor};
      }
      text-decoration: none;
    }
  }
`;

const Overlay = ({ open, closeOverlay, links }) => (
  <List open={open}>
    {links.map((l) => (
      <li key={l.name}>
        <Link to={l.link}>
          <button onClick={closeOverlay}>{l.name}</button>
        </Link>
      </li>
    ))}
  </List>
);

export default Overlay;
