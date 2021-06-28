import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import breakPoints from '../components/breakpoints';
import asmaaUlHusnaa from '../data/asmaaUlHusna.json';

const Container = styled.div`
  color: ${(props) => props.theme.textColor};
  &.names {
    display: flex;
    justify-content: space-evenly;
    padding-top: 20px;
    @media screen and (max-width: ${breakPoints.S}) {
      padding-top: 10px;
      flex-direction: column;
    }
  }
  &.center {
    text-align: center;
  }
`;

const Item = styled.li`
  background: ${(props) => props.theme.backgroundTextColor};
  border-radius: 11px;
  margin: 6px;
  > a {
    color: ${(props) => props.theme.onBackgroundTextColor};
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    padding: 10px;
    @media screen and (max-width: ${breakPoints.S}) {
      justify-content: space-around;
    }
    &:hover {
      color: ${(props) => props.theme.primaryColor};
      cursor: pointer;
    }
  }
`;

const Para = styled.p`
  color: ${(props) => props.theme.textColor};
  margin: 0;
  font-weight: 900;
  &.opacity-below {
    opacity: 0.5;
  }
  &.name {
    font-size: 40px;
    padding: 20px;
    line-height: normal;
  }
  &.highlight {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 20%;
  @media screen and (max-width: ${breakPoints.S}) {
    width: 90%;
    align-self: center;
  }
`;

function Asmaa() {
  const [name, setName] = useState({ name: 'Allah', arabName: 'اللّٰه‎' });

  function createRows(names) {
    return names.map((n, i) => {
      return (
        <Item key={n.number} onClick={(e) => setName(asmaaUlHusnaa[i])}>
          <Link to="#primary">
            <div>{i + 1}</div>
            <div>{n.name}</div>
            <div>{n.arabName}</div>
          </Link>
        </Item>
      );
    });
  }

  return (
    <Layout>
      <SEO lang="en" title="Asmaa Ul Husnaa" description="A page where we list all the beautiful names of Allah." />
      <Container className="header">
        <Container className="center ">
          <Para className="name">{name.arabName}</Para>
          <Para className="name highlight">{name.name}</Para>
        </Container>
      </Container>
      <Container className="names">
        <List>{createRows(asmaaUlHusnaa.slice(0, 99))}</List>
      </Container>
    </Layout>
  );
}

export default Asmaa;
