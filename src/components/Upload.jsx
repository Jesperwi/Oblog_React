import React, { useState } from 'react';
import styled from 'styled-components';
import BlogDelete from './BlogDelete';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  border: solid 0.4px #E0E0E0;
  height: auto; 
  padding: 1em 5em 10em 5em;
  margin: 1em;
`
const Upload = () => {

const [formValues, setFormValues] = useState({ 
title: '',
description: '',
description1: '',
description2: ''
});


  const handleChange = (e) => {
  setFormValues({ 
    ...formValues,
    [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
      let formData = new FormData(document.forms.namedItem("formname"));
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
      fetch('http://localhost:3002/posts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        method: 'POST',
        body: formData
      }).then(() => alert('A new post has been created'))
    }


return (  
  <div>
    <FormWrapper name="formname" onSubmit={handleSubmit}>
      <label>
        Title:
        <input style={{margin:6 ,width: 545 }} type="text" name="title" value={formValues.title} onChange={e => handleChange(e)} />
      </label>
      <label>
        Description:
        <textarea  style={{margin:6 ,height: 200,width: 500 }} cols="40" 
       rows="5" type="text" name="description" value={formValues.description} onChange={e => handleChange(e)} />
      </label>
      <label>
        Image:
        <input style={{margin:6}} type="file" name="file"/>
      </label>
      <label>
        Description:
        <textarea  style={{margin:6 ,height: 200,width: 500 }} cols="40" 
       rows="5" type="text" name="description1" value={formValues.description1} onChange={e => handleChange(e)} />
      </label>
      <label>
        Image:
        <input style={{margin:6}} type="file" name="file1" />
      </label>
      <label>
        Description:
        <textarea  style={{margin:6 ,height: 200,width: 500 }} cols="40" 
       rows="5" type="text" name="description2" value={formValues.description2} onChange={e => handleChange(e)} />
      </label>
      <label>
        Image:
        <input style={{margin:6}} type="file" name="file2" />
      </label>
      <input style={{width:100,}} type="submit" value="Submit" />
    </FormWrapper>
    <BlogDelete />
  </div>
  )
}

export default Upload;