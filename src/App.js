import logo from './logo.svg';
import './App.css';
import { useContext, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ImageIcon from '@material-ui/icons/Image';





function App() {
  const [pic,setPic] = useState("")
  const [recieved,setRecieved] = useState(0)
  const [canUpload,setCanUpload] = useState(false)




  


  function handleChange(e){
    
    
    
    if(e.target.files[0].type=='image/jpeg'){
      setCanUpload(true)
    console.log(e)
    setPic(e.target.files[0])
    console.log(e.target.files[0].type)
    console.log(pic.type)
  }}



  


  
 async function handleUpload(event){
   setCanUpload(false)

  event.preventDefault()
  
  var formData = new FormData();
  console.log(pic)

  formData.append("image", pic,pic.name)
  let res = await axios.post("http://ec2-54-188-60-143.us-west-2.compute.amazonaws.com:5000/upload",formData,{
    headers: {
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    }}) 

      
      setRecieved(res.data)
      setPic("")
       console.log(res.data)}



  return (
    <div className='App'>
      <div className='filler'/>

 

    <form onSubmit = {handleUpload} accept='jpg' encType="multipart/form-data">
    <label htmlFor="contained-button-file">
        <Button disabled ={pic==""?false:true} variant="contained" component="span" startIcon={<ImageIcon />}>
          Select
        </Button>
      </label>
      <p><input className='upload' id="contained-button-file" onChange={handleChange} type="file" name="file" accept='jpg'/></p>

      <Button disabled={!canUpload}
      onClick={handleUpload}
        variant="contained"
        color="default"
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
    </form>
    {recieved !=0?<img className = 'imagediv' src={`data:image/jpg;base64,${recieved}`} />:false}
  
    
      


      
    </div>
  );
}

export default App;
