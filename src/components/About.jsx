import React from 'react';
import styled from 'styled-components';
import aboutpic1 from '../img/aboutpic1.png'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  height: auto; 
  padding: 1em 5em 5em 5em;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 70%;
  }
`;

const Textwrap = styled.div`
  width: 700px;
  @media (max-width: 768px) {
    width:fit-content;
    height:fit-content;
  }
`

const AboutHead = styled.div`
  text-transform: uppercase;
  color: #2C2C2C;
  font-size: 40px;
  line-height: 3em;
  font-family: 'Playfair Display SC', serif;
`

const AboutText = styled.div`
  color: #2C2C2C;
  font-size: 20px;
  font-family: 'benne', serif;
`

const AboutPic = styled.img`
  width: 850px;
  height: 600px;
  box-shadow: 1px 5px 10px #808080;
  @media (max-width: 768px) {
    
    width: 100%;
    height: auto;
  }
`
const About = () => {
  return(
    <Wrapper>
      <AboutPic src={aboutpic1} />
      <Textwrap>
        <AboutHead>About Me</AboutHead>
        <AboutText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed praesentium dolorum reprehenderit fugit temporibus natus velit, assumenda officia mollitia blanditiis, 
          unde facilis debitis obcaecati numquam omnis in est tempora ex?</AboutText>
      </Textwrap>
    </Wrapper>
  )
}

export default About;