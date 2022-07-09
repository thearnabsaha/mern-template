import React, { useEffect,useState } from 'react'
const Home = () => {
  const [userData, setUserData] = useState({name:""})
  const callHomePage=async()=>{
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
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    callHomePage()
  }, [])
  return (
    <div>
      <h1>home</h1>
      <h1>{userData.name?`Hi, ${userData.name} nice to meet you`:"Sorry, But I don't Know You"}</h1>
    </div>
  )
}

export default Home