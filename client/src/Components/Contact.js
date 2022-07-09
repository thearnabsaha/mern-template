import React, { useState,useEffect } from 'react'

const Contact = () => {
  const [contact, setContact] = useState({
    name:"",email:"",message:""
  })
  const userContact=async()=>{
    try {
      const res = await fetch("/contact",{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      })
      const data = await res.json()
      setContact(data)
      if(!res.status===200){
        throw new Error(res.error)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    userContact()
  }, [])
  let name,value;
  const handleChange=(e)=>{
    name=e.target.name
    value=e.target.value
    setContact({...contact,[name]:value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const {name,email,message}=contact
    const res = await fetch("/contact",{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:"include",
      body:JSON.stringify({name,email,message})
    })
    const data = await res.json()
    console.log(data);
    if(!data){
      window.alert("invalid Registration")
      console.log("invalid Registration")
    }else{
      window.alert("message send!!")
      console.log("message send!!")
    }
    setContact({
      ...contact,message:""
    })
  }
  return (
    <div>
      <h1>Contact</h1>
      <form method='POST'>
        <input type="text" name='name' placeholder='Name' value={contact.name} onChange={handleChange}/>
        <input type="email" name='email' placeholder='Email' value={contact.email} onChange={handleChange}/>
        <textarea name="message" placeholder='Message' value={contact.message} onChange={handleChange}></textarea>
        <button type="submit" onClick={handleSubmit}>Send Message</button>
      </form>
    </div>
  )
}

export default Contact