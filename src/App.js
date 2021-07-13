import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './components/Header';
import Main from './components/Main';
function App() {

  //se crea el state principal
  const [busqueda, guardarBusqueda] = useState({
    title: ''
  });

  //se añade un state para controlar lo que se consulta
  const [consultar, guardarConsultar] = useState(false);
  
  return (
    <div className="App">
      <Header 
        titulo="Nearsoft - Task Interview - React"
      />
      <Main
        busqueda={busqueda}
        guardarBusqueda={guardarBusqueda}
        guardarConsultar={guardarConsultar}
      />
    </div>
  );
}

export default App;