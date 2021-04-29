import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  border: solid 0.4px #E0E0E0;
  height: auto; 
  flex-direction: column;
  align-items: center;
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

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const data = await fetch('http://localhost:3002/posts');
      const json = await data.json();
      console.log(json);
      setPosts(json.reverse());
    } catch(e) {
      throw e;
    }
  }
  console.log(posts, '2')
  useEffect(() => {
    getAllPosts();
  }, [])

  return (
    <Wrapper>
    {posts.map((item, parent) => 
      (
        <div key={parent}>
          <Header>{item.title}</Header>
          <Description>{item.description}</Description>
          {item.image != null && item.image !== '' && <Image src={item.image}></Image>}
          <Description>{item.description1}</Description>
          {item.image1 != null && item.image1 !== '' && <Image src={item.image1}></Image>}
          <Description>{item.description2}</Description>
          {item.image2 != null && item.image2 !== '' &&  <Image src={item.image2}></Image>}
        </div>  
        ))}
    </Wrapper>
);
}

export default BlogList;