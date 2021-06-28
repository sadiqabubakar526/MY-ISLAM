import React, { useEffect, useState, useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';
import { ThemeManagerContext } from 'gatsby-styled-components-dark-mode';

import Footer from './footer';
import Nav from './nav';
import breakPoints from './breakpoints';

const GlobalStyle = createGlobalStyle`
  html {
    font: 112.5%/1.42em Roboto, sans-serif, sans-serif;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  body {
    margin: 0;
    background: ${(props) => props.theme.secondaryColor};
    overflow-y: hidden;
    font-family: Roboto, sans-serif;;
    font-weight: normal;
    font-kerning: normal;
    font-feature-settings: "kern", "liga", "clig", "calt";
  }

  body::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 2px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.primaryColor};
    border-radius: 8px;
  }
`;

const Container = styled.div`
  color: ${(props) => props.theme.textColor};
  margin-top: 30px;
  &.header {
    display: flex;
    padding: 50px;
    justify-content: space-evenly;
    @media screen and (max-width: ${breakPoints.S}) {
      padding: 50px 30px;
    }
  }
  &.end {
    display: flex;
    flex-direction: column;
    text-align: end;
  }
`;

const Para = styled.p`
  color: ${(props) => props.theme.textColor};
  margin: 0;
  font-weight: 900;
  &.opacity-below {
    opacity: 0.5;
  }
  &.highlight {
    color: ${(props) => props.theme.primaryColor};
  }
`;

function Layout({ children }) {
  const today = moment();

  const [hijriDate, setHijriDate] = useState('');
  useContext(ThemeManagerContext);

  useEffect(fetchHijriDate, []);

  function fetchHijriDate() {
    fetch(`https://api.aladhan.com/v1/gToH?date=${today.format('DD-MM-YYYY')}`)
      .then((res) => res.json())
      .then((result) => {
        setHijriDate(result.data.hijri.date);
      });
  }
  return (
    <>
      <GlobalStyle />
      <Nav />
      <div>
        <Container className="header">
          <div id="primary">
            <Container className="">
              <Para>As-salamu alaykum,</Para>
              <Para className="opacity-below">May Allah's blessings be bestow upon you.</Para>
            </Container>
          </div>
          <Container className=" end">
            <Para className="highlight">{hijriDate.replace(/-/g, '/')}</Para>
            <Para className="highlight">{today.format('LL')}</Para>
            <Para className="opacity-below highlight">{today.format('LTS')}</Para>
          </Container>
        </Container>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
