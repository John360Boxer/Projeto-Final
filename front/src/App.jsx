import React from 'react'
import './App.css'
import Home from './componentes/Home';
import Logo from './assets/Logo_RedEX.png';

function App() {
  
  return(
    <>
      <img src={Logo} alt="Logo RedEX" />
      <h1>A Plataforma Unificada de Projetos de Extensão!</h1>
      <Home />
    </>
    
  );
  
}

export default App