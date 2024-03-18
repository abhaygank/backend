import React,{useEffect}from 'react';
import './App.css';
import {useState} from 'react';
import axios from 'axios'
function  App(){
  const[name,setName]=useState('')
  const[phone,setPhone]=useState(0)
  const[phonebook,setphonebook]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:8080/get-phone').then(res=>{
      setphonebook(res.data.data.PhoneNumbers)
    })
    },[])
  const addNewNumber=()=>{
    axios.post('http://localhost:8080/add-phone',{name,phone}
    ).then(function(response){
      console.log(response);
    }).catch(function(error){
      console.log(error);
    })
  }
  return(
     <div className='container'>
      <h1>PhoneBook</h1>
      {
        phonebook.map((val,key)=>{
          return <div key={key} className="card">
            <p>Name:{val.name}</p>
            <p>Number{val.phone}</p>
            </div>
        })
      }
      <hr/>
      <label htmlFor="">Name:</label>
      <input type='text'onChange={(e)=>{setName(e.target.value)}}/><br/><br/>
      <label htmlFor="">Phone:</label>
      <input type='number'onChange={(e)=>{setPhone(e.target.value)}}/><br/><br/>
      <button onClick={addNewNumber}>Add New Number</button>
     </div>
  );
}
export default App;