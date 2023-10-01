import { useState } from 'react'
import "./style/app_style.css"
import Home from './home'
import { Route,Routes } from "react-router-dom"
import Login from './Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

        <Routes>
        <Route path='/' element={<Login/>}> </Route>
        <Route path='/home' element={<Home/>}> </Route>
        </Routes>
    
    </>
  )
}

export default App
