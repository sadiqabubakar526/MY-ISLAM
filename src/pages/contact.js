/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import styled from 'styled-components';

import SEO from '../components/seo';
import Layout from '../components/layout';
import breakPoints from '../components/breakpoints';

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    margin-bottom: 50px;
    font-weight: 700;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    > div {
      display: flex;
      flex-direction: column;
      padding: 10px 10px 10px 0px;
    }
  }
`;

const Input = styled.input`
  width: 200px;
  padding: 5px;
  margin-top: 10px;
  background: ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  outline: none;
  font-weight: 700;
  border: none;
  border-bottom: 4px solid ${(props) => props.theme.primaryColor};
`;

const Button = styled.button`
  padding: 12px 25px;
  border-radius:8px;
  width:100px;
  cursor: pointer;
  outline: none;
  font-size: 14px;
  background: ${(props) => props.theme.secondaryColor};
  border: 2px solid ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.primaryColor};
  &:hover {
    background: ${(props) => props.theme.secondaryColor};
  }
`;

const Label = styled.label`
  color: ${(props) => props.theme.textColor};
`;

const TextArea = styled.input`
  width: 70%;
  height: 15px;
  outline: none;
  margin-top: 40px;
  background: ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.textColor};
  border: none;
  border-bottom: 4px solid ${(props) => props.theme.primaryColor};
  @media screen and (max-width: ${breakPoints.S}) {
    width: 90%;
  }
`;

const Container = styled.div`
  align-items: center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.textColor};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  margin: 0;
  font-weight: 900;
  text-align: center;
  padding: 25px;
  &:hover {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const SecondTitle = styled.h2`
  color: ${(props) => props.theme.textColor};
  margin: 0;
  font-weight: 900;
  text-align: center;
  padding: 5px;
  font-size: 15px;
  > span {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const Row = styled.div`
  display: inline-flex;
`;

function Contact() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit() {
    if (name && email && message) {
      const carriageReturn = '%0D%0A %0D%0A';
      const emailBody = `Hi, I am ${name}.${carriageReturn} ${message}.${carriageReturn} would like to be in touch.`;
      window.location = `mailto: surajabubakar443@gmail.com?subject=Contact from ${name}&body=${emailBody}`;
    }
  }

  return (
    <Layout>
      <SEO lang="en" title="Hadith" description="Welcome to this page,read the some random hadiths to boost your Iman (faith) so as not to be among those who are astay." />
      <Container>
        <Title>Contact</Title>
        <SecondTitle>
          I would like to hear from you <span>{name}</span>.
        </SecondTitle>
        <br></br>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Row>
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </Row>
            <div>
              <Label>Message</Label>
              <TextArea
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </div>
          </FormGroup>
          <Button type="submit">Send</Button>
        </form>
      </Container>
    </Layout>
  );
}

export default Contact;
