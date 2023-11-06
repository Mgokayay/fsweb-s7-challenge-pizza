import React from 'react'
import { useState } from 'react'
import './App.css'
import {Route,Switch } from 'react-router-dom'
import Anasayfa from './Components/AnaSayfa'
import SiparişFormu from "./Components/SiparişFormu"
import Success from "./Components/Success"
function App() {
  
  const [siparisler, setSiparisler] = useState([]);
  

  const handleSiparisEkle = (siparis) => {
    setSiparisler([...siparisler,siparis]);
  };

  return (
    <>
      
        <Switch>
          <Route exact path="/">
            <Anasayfa/>
          </Route>
          <Route exact path="/pizza">
            <SiparişFormu addSiparis={handleSiparisEkle}/>
          </Route>
          <Route exact path="/success">
            <Success/>
          </Route>
        </Switch>
      
    </>  
  )
}

export default App
