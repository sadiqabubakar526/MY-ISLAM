import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { ThemeManagerContext } from 'gatsby-styled-components-dark-mode';

import Github from './svg/github';
import Linkedin from './svg/linkedin';
import Web from './svg/web';

const Container = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 30px 0 15px 0;
  align-items: center;
`;

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: fit-content;
  margin: 0 auto;
  padding: 10px;
`;

const Item = styled.li`
  font-size: 15px;
  padding-bottom: 10px;
  padding-right: 10px;
  > a > div > svg {
    width: 25px;
    fill: ${(props) => props.theme.textColor};
    &:hover {
      fill: ${(props) => props.theme.primaryColor};
    }
  }
`;

const links = [
  {
    link: 'https://my-islam-suraj-abubakar.netlify.app/',
    name: 'web',
    icon: <Web />,
  },
  {
    link: 'https://github.com/sadiqabubakar526/',
    icon: <Github />,
    name: 'github',
  },
  {
    link: 'https://www.linkedin.com/in/suraj-abubakar-2757b3202/',
    icon: <Linkedin />,
    name: 'linkedin',
  },
];

function Footer() {
  useContext(ThemeManagerContext);
  return (
    <Container>
      <List>
        {links.map((i) => (
          <Item key={i.name}>
            <Link prefetch="false" to={i.link}>
              {i.icon}
            </Link>
          </Item>
        ))}
      </List>
    </Container>
  );
}

export default Footer;
