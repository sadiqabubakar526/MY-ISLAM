import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import breakPoints from './/breakpoints';
import ThemeSwitcher from './themeSwitcher';
import BurgerMenu from './burger';

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  padding: 2px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px -2px 40px 1px rgba(0, 0, 0, 0.75);
  position: fixed;
  background-color: ${(props) => props.theme.secondaryColor};
  z-index: 1;
  top: 0;
  width: 100%;
  @media screen and (max-width: ${breakPoints.S}) {
    height: 50px;
  }
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 10px;
  display: flex;
  flex-direction: row;
  width: fit-content;
  justify-content: space-around;
  > a {
    text-decoration: none;
  }
`;

const Item = styled.li`
  font-size: 16px;
  padding: 10px;
  margin-right: 20px;
  color: ${(props) => props.theme.textColor};
  &:hover,
  &:focus {
    box-shadow: inset 10em 0 0 0 ${(props) => props.theme.primaryColor};
    transition: 0.15s;
  }
  @media screen and (max-width: ${breakPoints.S}) {
    font-size: 12px;
  }
`;

const MobileNav = styled.div`
  display: none;
  @media screen and (max-width: ${breakPoints.S}) {
    display: block;
  }
`;

const DesktopNav = styled.div`
  display: flex;
  @media screen and (max-width: ${breakPoints.S}) {
    display: none;
  }
`;

const links = [
  {
    link: '/',
    name: 'Prayer',
  },
  {
    link: '/quran',
    name: 'Quran',
  },
  {
    link: '/asmaa',
    name: 'Asmaa ul husna',
  },
  {
    link: '/calendar',
    name: 'Calendar',
  },
  {
    link: '/hadith',
    name: 'Hadith',
  },
  {
    link: '/contact',
    name: 'Contact',
  },
];

function Nav() {
  return (
    <Container>
      <DesktopNav>
        <List>
          {links.map((i) => (
            <Link key={i.name} prefetch="false" to={i.link}>
              <Item>{i.name}</Item>
            </Link>
          ))}
        </List>
      </DesktopNav>
      <ThemeSwitcher />
      <MobileNav>
        <BurgerMenu links={links} />
      </MobileNav>
    </Container>
  );
}

export default Nav;
