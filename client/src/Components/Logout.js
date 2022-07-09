import React, { useEffect } from 'react'
const Logout = () => {
    const callLogoutPage=async()=>{
        try {
          const res = await fetch("/logout",{
            method:"GET",
            headers:{
              "Content-Type":"application/json",
            },
          })
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
        callLogoutPage()
      }, [])
  return (
    <div></div>
  )
}

export default Logout