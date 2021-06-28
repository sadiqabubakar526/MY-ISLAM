import React from 'react';
import styled from 'styled-components';

import breakPoints from '../components/breakpoints';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Container = styled.div`
  color: ${(props) => props.theme.textColor};
  &.center {
    text-align: center;
  }
  > iframe {
    width: 350px;
    height: 300px;
    @media screen and (max-width: ${breakPoints.S}) {
      width: 300px;
      height: 270px;
    }
    border: 1px solid ${(props) => props.theme.primaryColor};
    border-radius: 5px;
    box-shadow: ${(props) => props.theme.primaryColor} 1px 5px 20px 2px;
  }
`;

function Calendar() {
  return (
    <Layout>
      <SEO lang="en" title="Calendar" description="A page where we list the hijra calendar." />
      <Container className="center">
        <iframe
          title="islamic-calendar"
          scrolling="no"
          src="https://www.islamicfinder.org/islamic-calendar/widgetGregorian?type=Gregorian"
        ></iframe>
      </Container>
    </Layout>
  );
}

export default Calendar;
