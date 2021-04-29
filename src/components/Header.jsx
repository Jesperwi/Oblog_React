import React from 'react';
import styled from 'styled-components';
import Headerimg1 from '../img/Headerimg1.jpg'

const ImageWrapper = styled.div`
  display: flex;
  background-color: #D7CACA;
  justify-content: center;
  align-items: center;
`

const ImageHeader = styled.img`
  width: 1300px;
  height: auto;
  box-shadow: 0px 5px 70px #808080;
`

const Header = () => {
  return(
    <ImageWrapper>
    <ImageHeader src={Headerimg1} />
    </ImageWrapper>
  )
}

export default Header;