import React, { useState } from 'react'
const Signup = () => {
  const [signUp, setSignUp] = useState({
    name:"",username:"",email:"",password:"",confirmPassword:"",gender:""
  })
  let name,value;
  const handleChange=(e)=>{
    name=e.target.name
    value=e.target.value
    setSignUp({...signUp,[name]:value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(signUp);
    const {name,email,password,confirmPassword,username,gender}=signUp
    const res = await fetch("/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name,email,password,confirmPassword,username,gender})
    })
    const data = await res.json()
    if(data.Status===422||!data){
      window.alert("invalid Registration")
      console.log("invalid Registration")
    }else{
      window.alert("Registration sucessful!!")
      console.log("Registration sucessful!!")
    }
    setSignUp({
      name:"",username:"",email:"",password:"",confirmPassword:"",gender:""
    })
  }
  return (
    <div>
      <h1>Signup</h1>
      <form method='POST'>
        <input type="text" name='name' placeholder='Name' value={signUp.name} onChange={handleChange}/>
        <input type="text" name='username' placeholder='Username' value={signUp.username} onChange={handleChange}/>
        <input type="email" name='email' placeholder='Email' value={signUp.email} onChange={handleChange}/>
        <input type="password" name='password' placeholder='Password' value={signUp.password} onChange={handleChange}/>
        <input type="password" name='confirmPassword' placeholder='Confirm Password' value={signUp.confirmPassword} onChange={handleChange}/>
        <label htmlFor="male">Male</label>
        <input type="radio" name="gender" value="male" onChange={handleChange}/>        
        <label htmlFor="female">Female</label>
        <input type="radio" name="gender" value="female" onChange={handleChange}/>        
        <label htmlFor="others">Others</label>
        <input type="radio" name="gender" value="others" onChange={handleChange}/>    
        <button type="Submit" value="signup" name='signup' onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  )
}

export default Signup