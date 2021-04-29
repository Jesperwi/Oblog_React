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

const Deletebutton = styled.button`
width: 70px;
height: 30px;
`

const BlogDelete = () => {
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
  
  const deletePost = async (_id) => {;
    fetch(`http://localhost:3002/posts/${_id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        method: 'DELETE',
  })
    .then(res => res.text()) // or res.json()
    .then(() => alert('Post has been deleted'))
  }

  useEffect(() => {
    getAllPosts();
  }, [])

  return (
    <Wrapper>
      {posts.map((item, parent) => (
        <div key={parent}>
         <Header>{item.title}</Header>
          <Description>{item.description}</Description>
          <Image src={item.image}></Image>
          <Description>{item.description1}</Description>
          <Image src={item.image1}></Image>
          <Description>{item.description2}</Description>
          <Image src={item.image2}></Image>
          <Deletebutton onClick={() => deletePost(item._id)}>Delete</Deletebutton>
        </div>
  
      ))}
    </Wrapper>
);
}

export default BlogDelete;