import React from 'react';
import{ Link } from "react-router-dom";
import styled from 'styled-components';

const Ul = styled.ul`
list-style: none;
display: flex;
flex-flow: row nowrap;
text-align: center;
z-index: 20;

flex-flow: column nowrap;
background-color: #D7CACA;
position: fixed;
transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
top: 0;
right: 0;
height: 100vh;
width: 300px;
padding-top: 3.5rem;
transition: transform 0.2s ease-in-out;
li {
    color: #fff;
}
`;

const StyledLink = styled(Link)`
color: white;
text-decoration: none;
text-transform: uppercase;
font-size: 20px;
letter-spacing: 3px;
line-height: 4em;
margin-top: 2em;

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
    transition: all 0.2s ease-in-out 0s;
  }
  &:hover  { 
    color: #938E8E;
    &::before {
      visibility: visible;
      transform: scaleX(1);
    }
  }
`

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

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      {navUrls.map(item => (
        <StyledLink to={item.url} key={item.name}>{item.name}</StyledLink>
      ))} 
    </Ul>
  )
}

export default RightNav