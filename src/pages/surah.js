import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';

import Layout from '../components/layout';
import SEO from '../components/seo';
import breakPoints from '../components/breakpoints';
import Next from '../components/svg/next';
import Previous from '../components/svg/previous';

const Container = styled.div`
  &.ayahs {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: ${(props) => props.theme.textColor};
    margin-top: 30px;
    overflow: auto;
    max-height: 100vh;
    width: 50%;
    margin: 0 auto;
    box-shadow: 0px 1px 15px 4px rgba(0, 0, 0, 0.75);
    border-radius: 10px;
    padding: 10px;
    margin-top: 40px;
    @media screen and (max-width: ${breakPoints.S}) {
      width: 80%;
    }
    > p {
      font-size: 40px;
      @media screen and (max-width: ${breakPoints.S}) {
        font-size: 30px;
      }
      line-height: 2em;
      line-break: normal;
      > span {
        color: ${(props) => props.theme.primaryColor};
        font-size: 25px;
        display: inline-block;
      }
    }
  }
  &.breadcrumb {
    display: flex;
    justify-content: space-evenly;
    margin: 10px;
    align-items: center;
    > button {
      background: none;
      border: none;
    }
    button > div > svg {
      width: 2em;
      cursor: pointer;
      fill: ${(props) => props.theme.primaryColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  margin: 0;
  font-weight: 900;
  text-align: center;
`;

const SecondTitle = styled.h2`
  margin: 0;
  font-weight: 200;
  text-align: center;
  padding: 5px;
  color: ${(props) => props.theme.primaryColor};
`;

function Ayah({ ayah }) {
  const arabNumb = `${ayah.numberInSurah}`.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);
  return (
    <>
      {ayah.text}
      <span> ﴾{arabNumb}﴿ </span>
    </>
  );
}

function Surah(props) {
  const [surah, setSurah] = useState({});

  useEffect(() => {
    const { id } = queryString.parse(props.location.search);
    fetchSurah(id);
  }, [props.location.search]);

  function fetchSurah(id = 1) {
    fetch(`https://api.alquran.cloud/v1/surah/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setSurah(result.data);
      });
  }

  return (
    <Layout>
      <SEO lang="en" title="Surah" description="Welcome and read the holy Quran, read a surah now.The prophet(SAW) said to someone that is devoted to the Qur’an. read and recite the way you use to recite in Dunya. your rank will be at the last verse you recite. So the more you recite, the higher rank you will get." />
      <Container>
        <SecondTitle>{surah.name}</SecondTitle>
        <Container className="breadcrumb">
          <button onClick={() => fetchSurah(surah.number > 1 ? surah.number - 1 : 114)}>
            <Previous />
          </button>
          <Title>{surah.englishName}</Title>
          <button onClick={() => fetchSurah(surah.number === 114 ? 1 : surah.number + 1)}>
            <Next />
          </button>
        </Container>
        <Container className="ayahs">
          <p>{surah.ayahs && surah.ayahs.map((a) => <Ayah key={a.numberInSurah} ayah={a} />)}</p>
        </Container>
      </Container>
    </Layout>
  );
}

export default Surah;
