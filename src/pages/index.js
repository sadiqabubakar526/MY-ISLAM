import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import breakPoints from '../components/breakpoints';

const Container = styled.div`
  &.center {
    text-align: center;
    padding-bottom: 2em;
  }
  &.space-bottom {
    padding-bottom: 3em;
  }
  &.flex {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 30%;
    align-items: center;
  }
`;

const ListPrayer = styled.ul`
  display: inline-flex;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: space-evenly;
  width: 65%;
  @media screen and (max-width: ${breakPoints.S}) {
    width: 90%;
  }
`;

const Location = styled.button`
  background: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 5px;
  border: none;
  padding: 10px;
  font-size: 15px;
  width: 150px;
  margin-bottom: 15px;
  cursor: pointer;
`;

const Prayer = styled.li`
  width: 30%;
  position: relative;
  @media screen and (max-width: ${breakPoints.S}) {
    width: 20%;
  }

  &:first-child:after {
    content: none;
  }

  &:before {
    content: ' ';
    border-radius: 50%;
    width: 25px;
    height: 25px;
    border: 1px solid ${(props) => props.theme.textColor};
    display: block;
    text-align: center;
    margin: 0 auto 20px;
    background-color: ${(props) => props.theme.textColor};
    @media screen and (max-width: ${breakPoints.S}) {
      width: 20px;
      height: 20px;
    }
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: ${(props) => props.theme.textColor};
    top: 15px;
    @media screen and (max-width: ${breakPoints.S}) {
      top: 9px;
    }
    left: -50%;
    z-index: -1;
  }

  &.active {
    color: ${(props) => props.theme.primaryColor};
  }

  &.active:before {
    border-color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.primaryColor};
  }

  &.active:after {
    background-color: ${(props) => props.theme.primaryColor};
  }

  > div {
    color: #fffafa;
    padding: 5px;
    text-transform: uppercase;
    @media screen and (min-width: ${breakPoints.M}) {
      background: #000000;
      color: #fffafa;
      border-radius: 11px;
      width: fit-content;
      margin: auto;
      padding: 5px 20px 5px 20px;
    }
    @media screen and (max-width: ${breakPoints.S}) {
      font-size: 12px;
      color: ${(props) => props.theme.textColor};
    }
  }
  > span {
    color: ${(props) => props.theme.textColor};
    @media screen and (max-width: ${breakPoints.S}) {
      font-size: 12px;
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
  &.prayer {
    text-align: center;
    text-transform: uppercase;
    font-size: 50px;
    margin: 50px;
    @media screen and (max-width: ${breakPoints.S}) {
      margin: 15%;
    }
  }
  &.highlight {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const Select = styled.select`
  width: 150px;
  background: ${(props) => props.theme.secondaryColor};
  cursor: pointer;
  border: none;
  padding: 5px;
  border-radius: 5px;
  color: ${(props) => props.theme.textColor};
  outline: none;
`;

const Option = styled.option``;

function Home() {
  const [timings, setTimings] = useState([]);
  const [method, setMethod] = useState(2);
  const [currentSalat, setCurrentSalat] = useState({});
  const [localisation, setLocalisation] = useState({
    latitude: 50.8503,
    longitude: 4.3517,
  });

  const methodList = [
    { id: 0, name: 'Ithna Ashari' },
    { id: 1, name: 'University of Islamic Sciences, Karachi' },
    { id: 2, name: 'Islamic Society of North America' },
    { id: 3, name: 'Muslim World League' },
    { id: 4, name: 'Umm Al-Qura University, Mecca' },
    { id: 5, name: 'Egyptian General Authority of Survey' },
    { id: 7, name: 'Institute of Geophysics, University of Tehran' },
    { id: 8, name: 'Morocco' },
    { id: 9, name: 'Department of Islamic Advancement, Malaysia (JAKIM)' },
    { id: 10, name: 'Majlis Ugama Islam Singapura' },
    { id: 11, name: 'Union des Organisations Islamiques de France' },
    { id: 12, name: 'Turkey' },
  ];
  const fetchPrayers = useCallback(() => {
    fetch(
      `https://api.pray.zone/v2/times/today.json?longitude=${localisation.longitude}&latitude=${localisation.latitude}&elevation=333&school=${method}`
    )
      .then((res) => res.json())
      .then((result) => {
        const data = result.results.datetime[0].times;
        const salats = Object.keys(data)
          .map((t) => {
            return { name: t, time: data[t], className: isActive(data[t]) };
          })
          .filter((t) => !['Midnight', 'Imsak', 'Sunset', 'Sunrise'].includes(t.name));
        setTimings(salats);
        setCurrentSalat(salats.filter((t) => !t.className)[0] || salats[salats.length - 1]);
      });
  }, [localisation, method]);

  useEffect(() => {
    fetchPrayers();
  }, [fetchPrayers]);

  function isActive(time) {
    const now = new Date();
    const [hour, minute] = time.split(':');

    if (parseInt(hour) < now.getHours()) {
      return 'active';
    }

    if (parseInt(hour) === now.getHours() && parseInt(minute) <= now.getMinutes()) {
      return 'active';
    }

    return '';
  }

  function locationRetrieved(position) {
    const crd = position.coords;
    setLocalisation(crd);
    fetchPrayers();
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationRetrieved);
    }
  }

  function changeMethod(e) {
    setMethod(e.target.value);
    fetchPrayers();
  }

  return (
    <Layout>
      <SEO lang="en" title="MY-ISLAM" />
      <Container className="center">
        <Container className="flex space-bottom">
          <Para className="prayer">{currentSalat && currentSalat.name}</Para>
          <Para className="prayer">{currentSalat && currentSalat.time}</Para>
          <Location onClick={() => getLocation()}>Current position</Location>
          <Select name="methods" onChange={changeMethod}>
            <Option value={method}>Change method</Option>
            {methodList.map((m) => (
              <Option key={m.id} value={m.id}>
                {m.name}
              </Option>
            ))}
          </Select>
        </Container>
        <Container>
          <ListPrayer>
            {timings.map((t) => (
              <Prayer key={t.name} className={t.className}>
                <div>{t.name}</div>
                <span>{t.time}</span>
              </Prayer>
            ))}
          </ListPrayer>
        </Container>
      </Container>
    </Layout>
  );
}

export default Home;
