import React from 'react';
import styled from 'styled-components';

const ContactWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    height: auto; 
    padding: 1em 5em 18em 5em;
`

const ContactHead = styled.div`
  text-transform: uppercase;
  color: #2C2C2C;
  font-size: 40px;
  line-height: 3em;
  font-family: 'Playfair Display SC', serif;
  padding-bottom: 1em;
`

const ContactText = styled.div`
  color: #2C2C2C;
  font-size: 20px;
  font-family: 'benne', serif;
  line-height: 50px;
  text-decoration: underline;
`

const Contact = () => {

return(
  <ContactWrapper>
      <ContactHead>Contacts</ContactHead>
      <ContactText>Olgege@gmail.com <br />@instagram  <br />@Twitter</ContactText>
  </ContactWrapper>
)
}

export default Contact;