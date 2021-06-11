import logo from './logo.svg';
import './App.css';
import { useContext, useState } from 'react';
import { TextField } from '@material-ui/core';
import axios from 'axios';



function App() {

  const [url,setURL] = useState("")

 function handleSubmit(e){
    
    e.preventDefault()
    console.log(url)
    predict()
    
    
    setURL("")
  }



  async function predict(){
        let res = await axios.post('ec2-18-219-138-9.us-east-2.compute.amazonaws.com:5000/predict',{"url":url}) 

        console.log(res)}



  function handleChange(e){
    setURL(e.target.value)
  }


  return (
    <div className="App">
      hello
      <div className='form'>
        <form onSubmit={handleSubmit}>
          <TextField onChange={handleChange} value={url}/>
          <button>Submit</button>

        </form>

      </div>
      


      
    </div>
  );
}

export default App;
