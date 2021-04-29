import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
  display: flex;
  height: auto; 
  flex-direction: column;
`;

const Header = styled.p`
  color: #2C2C2C;
  font-size: 40px;
  line-height: 3em;
  font-family: 'Playfair Display SC', serif;
`;

const Description = styled.p`
 color: #2C2C2C;
 font-size: 20px;
 width: 500px;
 padding-bottom: 2em;
 font-family: 'benne', serif;
`;

const Image = styled.img`
  height: auto%;
  width: 600px;
  max-width: 100%;
  padding-bottom: 4em
`;


const BlogItem = ({posts}) => {

return (
  <Wrapper>
    <div>
      <Header>{posts.title}</Header>
      <Description>{posts.description}</Description>
      <Image src={posts.image}></Image>
      <Description>{posts.description1}</Description>
      <Image src={posts.image1}></Image>
      <Description>{posts.description2}</Description>
      <Image src={posts.image2}></Image>
    </div>
  </Wrapper>
);
}
  
  
  export default BlogItem;