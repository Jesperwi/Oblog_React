import React, { useState } from 'react';
import{ Link } from "react-router-dom";
import styled from 'styled-components';
import RightNav from './RightNav';
import splatter from '../img/splatter.png';
import Pik from '../img/Pik.png';

const NavBarStyled = styled.div`
  background-color: #fff;
  width: 100%;
  height: 165px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: solid 0.4px #E0E0E0;
`;

const StyledLink = styled(Link)`
  z-index: 2;
  position:relative;
  color: black;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 3px;
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    width: 96%;
    height: 1px;
    bottom: 0;
    left:0;
    background-color: #938E8E;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out 0s;
  }
  &:hover  { 
    color: #938E8E;
    &::before {
      visibility: visible;
      transform: scaleX(1);
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  flex-direction: row;
`;

const Splatter = styled.img`
  left: -5%;
  top: -16%;
  width: 10%;
  height: auto;
  position: absolute;
  transform: rotate(180deg);
  opacity: 30%;
  animation: fadein 0.1s;
`;

const Splatter1 = styled.img`
  right: -2%;
  top: -20%;
  width: 10%;
  height: auto;
  position: absolute;
  opacity: 30%;
  animation: fadein 0.1s;
`;

const Splatter2 = styled.img`
  right: 30%;
  top: -19%;
  width: 10%;
  height: auto;
  transform: rotate(240deg);
  position: absolute;
  opacity: 30%;
  animation: fadein 0.1s;
`;

const Logo = styled.img`
  width: 10%;
  height: auto;
  @media (max-width: 768px) {
    margin-left: 4em;
    width: 50%;
  }
`;

const Line1 = styled.div`
  margin: 20px 5px 5px 10px;
  background-color: black;
  width: 20px;
  height: 2px;
`;

const Line2 = styled.div`
  margin: 0px 10px;
  background-color: black;
  width: 30px;
  height: 2px;
`;

const Burger = styled.div`
  right: 3%;
  position: fixed;
  width: 50px;
  height: 50px;
  cursor: pointer;
  &:hover ${Line1} { background-color: #938E8E }
  &:hover ${Line2} { background-color: #938E8E }
  z-index: 30;
  div {
    width: 1.8rem;
    height: 0.14rem;
    background-color: ${({ open }) => open ? 'white' : '#747171'};
    border-radius: 10px;
    transform-origin: 7px;
    transition: all 0.2s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(30deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'rotate(-30deg)' : 'rotate(0)'};
    }
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
  }, 
  {
    name: 'Upload',
    url: '/upload'
  }
];

const NavBar = () => {

const [open, setOpen] = useState(false);

return (
  <NavBarStyled>
      <Splatter src={Pik} />
      <Splatter1 src={Pik} />
      <Splatter2 src={Pik} />
    <NavbarLeft>
      {navUrls.slice(0, 2).map(item => (
        <StyledLink to={item.url} key={item.name}>{item.name}</StyledLink>
      ))} 
      <Logo src={splatter} />
      {navUrls.slice(2, 4).map(item => (
        <StyledLink to={item.url} key={item.name}>{item.name}</StyledLink>
      ))}
    </NavbarLeft>
    <Burger open={open} onClick={() => setOpen(!open)}>
      <Line1 />
      <Line2 /> 
    </Burger>
    <RightNav open={open}/>
  </NavBarStyled>
)
}

export default NavBar;