import React, { useEffect,useState } from 'react'
const About = () => {
  const [userData, setUserData] = useState({})
  const callAboutPage=async()=>{
    try {
      const res = await fetch("/about",{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json",
        },
        credentials:"include"
      })
      const data = await res.json()
      setUserData(data)
      console.log(data);
      if(!res.status===200){
        throw new Error(res.error)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    callAboutPage()
  }, [])
  
  return (
    <div>
      <h1>About</h1>
      <form method='GET'>
          <h1>name: {userData.name}</h1>
          <h1>username: {userData.username}</h1>
          <h1>email: {userData.email}</h1>
          <h1>gender: {userData.gender}</h1>
      </form>
    </div>
  )
}

export default About