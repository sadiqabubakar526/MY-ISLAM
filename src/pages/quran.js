import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import breakPoints from '../components/breakpoints';

const Container = styled.div`
  &.center {
    text-align: center;
  }
  &.space-bottom {
    padding: 7%;
  }
  &.list {
    display: flex;
    justify-content: space-evenly;
    padding-top: 20px;
    @media screen and (max-width: ${breakPoints.S}) {
      padding-top: 10px;
      flex-direction: column;
    }
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

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  margin: 0;
  font-weight: 900;
  text-align: center;
  padding: 5px;
  &:hover {
    color: ${(props) => props.theme.primaryColor};
  }
`;

function Quran() {
  const [surahList, setSurahList] = useState([]);

  useEffect(() => {
    fetchMeta();
  }, []);

  function fetchMeta() {
    fetch(`https://api.alquran.cloud/v1/meta`)
      .then((res) => res.json())
      .then((result) => {
        setSurahList(result.data.surahs.references);
      });
  }

  function getList(from, to) {
    return surahList.slice(from, to).map((s) => {
      return (
        <Item key={s.number}>
          <Link to={`/surah?id=${s.number}`}>
            <div>{s.number}</div>
            <div>{s.englishName}</div>
            <div>{s.name}</div>
          </Link>
        </Item>
      );
    });
  }

  return (
    <Layout>
      <SEO lang="en" title="Quran" description="Welcome and read the holy Quran, Prophet(SAW) said an expert with Qur’an will be with a noble righteous scribe (the angels). And he who struggle while reciting finding it difficult has double rewards. either way, you are gainer!." />
      <Container>
        <Title>The Holy Quran</Title>
        <Container className="list">
          <List>{getList(0, 38)}</List>
          <List>{getList(38, 76)}</List>
          <List>{getList(76, 114)}</List>
        </Container>
      </Container>
    </Layout>
  );
}

export default Quran;
