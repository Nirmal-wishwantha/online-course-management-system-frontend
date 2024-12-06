import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'

function App() {

  const [login, setLogin] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('education');

    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }

  }, [])



  return (
    <div>

      {
        login ? <Main /> : <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      }

    </div>
  )
}

export default App






function Main() {

  return(
    <div>
    <Home />
  </div>
  )
 
}