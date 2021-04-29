import React, { useState, useEffect } from 'react';
import { Link, Route } from "react-router-dom";
import styled from 'styled-components';
import BlogItem from './BlogItem';


const Wrapper = styled.div`
  display: flex;
  height: auto;
  justify-content: space-around;
  margin-bottom: 30em;
`;

const Header = styled.p`
  color: #2C2C2C;
  font-size: 20px;
  line-height: 2em;
  font-family: 'Playfair Display SC', serif;
`;

const Linklist = styled.div`


`

const Contentpost = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding-right: 30em;
`

const Archive = () => {

  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    try {
      const data = await fetch('https://oliviablog.netlify.app/posts');
      const json = await data.json();
      setPosts(json.reverse());
    } catch(e) {
      throw e;
    }
  }
  
  useEffect(() => {
    getAllPosts();

  }, [])
  
  return (
      <Wrapper>
        <Linklist>
      {posts.map((item, m) => (
        <div key={m}>
          <Link to={`/archive/${item._id}`}>
          <Header>{item.title}</Header>
          </Link>
        </div>
        ))}
        </Linklist>
      <Contentpost>
     <Route
      exact path="/archive/:id" 
      render={({match}) => (<BlogItem posts={posts.find(m => m._id === match.params.id)}/>)}
      />
      </Contentpost>
    </Wrapper>
  );
}


export default Archive;