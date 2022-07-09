import React, { useState } from 'react'
const Signin = () => {
  const [signIn, setSignIn] = useState({
    username:"",password:""
  })
  let name,value;
  const handleChange=(e)=>{
    name=e.target.name
    value=e.target.value
    setSignIn({...signIn,[name]:value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const {password,username}=signIn
    const res = await fetch("/signin",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({password,username})
    })
    const data = await res.json()
    if(data.Status===400||!data){
      window.alert("invalid Registration")
      console.log("invalid Registration")
    }else{
      window.alert("Registration sucessful!!")
      console.log("Registration sucessful!!")
    }
    setSignIn({
      username:"",password:""
    })
  }
  return (
    <div>
      <h1>Signin</h1>
      <form method='POST'>
        <input type="text" name='username' placeholder='Username' value={signIn.username} onChange={handleChange}/>
        <input type="password" name='password' placeholder='Password' value={signIn.password} onChange={handleChange}/> 
        <button type="submit" value="signin" name='signin'  onClick={handleSubmit} >Sign In</button>
      </form>
    </div>
  )
}

export default Signin