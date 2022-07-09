import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import Contact from './Components/Contact'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import Error from './Components/Error'
import Logout from './Components/Logout'
import {Route,Routes} from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*"element={<Error/>} />
        </Routes>
    </>
  )
}

export default App