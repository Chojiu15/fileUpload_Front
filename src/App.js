import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useState } from 'react';

function App() {

  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [data, setData] = useState(null)


  const postImage = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('image', image)


    axios.post('http://localhost:8000/user', formData, {
      headers : {
        'content-type' : 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data.image)
      setData(response.data)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">

      <form onSubmit={postImage}>
        <input type='text' value={name} onChange={(e) => setName(e.target.value) }/>
        <input type='file'  onChange={(e) => setImage(e.target.files[0]) }/>
        <button type='submit'>
          Submit
        </button>
      </form>

      {data && (
        <>
        <h1>{data.name}</h1>
        <img width={'200px'} src={`http://localhost:8000${data.image}`} /> 
        </>
      )}

    </div>
  );
}

export default App;
