import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import breakPoints from '../components/breakpoints';

const Container = styled.div`
  text-align: justify;
  align-items: center;
  margin: 0 auto;
  width: 60em;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.textColor};
  > h1,
  h2 {
    line-height: 1.1;
  }
  > h3 {
    opacity: 0.5;
  }
  > h2 {
    color: ${(props) => props.theme.primaryColor};
  }
  @media screen and (max-width: ${breakPoints.S}) {
    width: 16em;
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  margin: 0;
  font-weight: 800;
  text-align: center;
  padding: 5px;
  &:hover {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const Button = styled.button`
  background: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 8px;
  border: none;
  padding: 10px;
  font-size: 12px;
  width: 150px;
  margin-bottom: 15px;
  cursor: pointer;
`;

function removeTags(str) {
  if (str === null || str === '') return false;
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, '');
}

function Hadit() {
  const [hadit, setHadit] = useState({
    'collection': 'riyadus-salihin',
    en: {
      'lang': 'en',
      'chapterNumber': '371',
      'chapterTitle': 'Seeking Forgiveness',
      'urn': 1616640,
      'body':
        "<p>Ibn Mas'ud (May Allah be pleased with him) said: The Messenger of Allah (ﷺ) said, \"He who says: 'Astaghfir ullah-alladhi la ilaha illa Huwal-Haiyul-Qayyumu, wa atubu ilaihi (I seek the forgiveness of Allah, there is no true god except Allah, the Ever-Living, the Self- Subsisting, and I turn to Him in repentance),' his sins will be forgiven even if he should have run away from the battlefield (while he was engaged in fighting for the Cause of Allah).\"<br/><br/><b>[Abu Dawud, At-Tirmidhi and Al-Hakim (on conditions of Al-Bukhari and Muslim for accepting Hadith)]</b>.<br/><br/></p>",
      'grades': [],
    },
    ar: {
      'lang': 'ar',
      'chapterNumber': '371',
      'chapterTitle': '- باب الأمر بالاستغفار وفضله',
      'urn': 1718620,
      'body':
        '<p>- وعن ابن مسعود رضي الله عنه قال‏:‏ قال رسول الله صلى الله عليه وسلم ‏:‏ ‏"‏من قال‏:‏ أستغفر الله الذي لا إله إلا هو الحي القيوم وأتوب إليه ، غفرت ذنوبه ، وإن كان قد فر من الزحف‏"‏ ‏(‏‏(‏رواه أبو داود والترمذي والحاكم، وقال‏:‏ حديث صحيح على شرط البخاري ومسلم‏)‏‏)‏‏.‏</p>',
      'grades': [],
    },
  });

  useEffect(() => {
    fetchHadit();
  }, []);

  function fetchHadit() {
    fetch(`https://api.sunnah.com/v1/hadiths/random`, {
      headers: { 'x-api-key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk' },
    })
      .then((res) => res.json())
      .then((result) => {
        setHadit({
          collection: result.collection,
          en: result.hadit.find((h) => h.lan === 'en'),
          ar: result.hadit.find((h) => h.lan === 'ar'),
        });
      });
  }

  return (
    <Layout>
      <SEO lang="en" title="Hadith" description="Welcome to this page,read the some random hadiths to boost your Iman (faith) so as not to be among those who are astay." />
      <Container>
        <Title>{hadit.en.chapterTitle}</Title>
        <Container>
          <h2>{hadit.ar.chapterTitle}</h2>
          <h3>{hadit.collection}</h3>
          <div>
            <p>{removeTags(hadit.en.body)}</p>
            <br></br>
            <p>{removeTags(hadit.ar.body)}</p>
          </div>
          <br></br>
          <Button onClick={() => fetchHadit()}>Random</Button>
        </Container>
      </Container>
    </Layout>
  );
}

export default Hadit;
