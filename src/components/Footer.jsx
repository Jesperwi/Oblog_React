import React from 'react';
import{ Link } from "react-router-dom";
import styled from 'styled-components';
import Pik from '../img/Pik.png';

const FooterStyled = styled.div`
  background-color: #373737;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
  @media (max-width: 768px) {
    margin-top: 4em;
    }
`;

const StyledLink = styled(Link)`
  z-index: 2;
  position: relative;
  text-decoration: none;
  color: white;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  font-height: 5px;
  letter-spacing: 2px;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    width: 96%;
    height: 1px;
    bottom: 0;
    left:0;
    background-color: #fff;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out 0s;
  }
  &:hover  { 
    &::before {
      visibility: visible;
      transform: scaleX(1);
    }
  }
`;

const Splatter = styled.img`
  left: 10%;
  margin-top: -5em;
  filter: brightness(100);
  width: 12%;
  height: auto;
  transform: rotate(260deg);
  position: relative;
  @media (max-width: 768px) {
    width:20%;
    left: 8%;
    top: -10%;
    }
`;

const Splatter1 = styled.img`
  left: 1%;
  margin-top: 8em;
  width: 12%;
  height: auto;
  filter: brightness(100);
  transform: rotate(70deg);  
  position: relative;
  @media (max-width: 768px) {
    width:20%;
    }
`;

const FooterLeft = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 30%;
  @media (max-width: 768px) {
    width:60%;
    }
`;

const navUrls = [
  {
    name: 'Home',
    url: '/'
  }, 
  {
    name: 'About',
    url: '/about'
  }, 
  {
    name: 'Archive',
    url: '/archive'
  }, 
  {
    name: 'Contact',
    url: '/contact'
  }
];

const Footer = () => {
  return (
    
    <FooterStyled>
       <Splatter src={Pik} />
      <FooterLeft>
        {navUrls.map(item => (
          <StyledLink to={item.url} key={item.name}>{item.name}</StyledLink>
        ))} 
      </FooterLeft>
      <Splatter1 src={Pik} />
    </FooterStyled>
  )
}

export default Footer;