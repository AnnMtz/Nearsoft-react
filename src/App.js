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

  const [resultado, guardarResultado] = useState([]);

  const [text, setText] = useState('');

  const [search, setSearch] = useState([]);

  //extraigo los valores de title del api
  const {title} = busqueda;

  //se crea un useEffect para ver los cambios que vaya teniendo
  useEffect(() => {
    const consultarAPI = async () => {
      const api = await axios.get('https://api.github.com/search/issues?q=repo:facebook/react+debug:in:title');
      console.log(api.data.items);
      guardarResultado(api.data.items)
    }
  consultarAPI();
  }, []);

  const onSuggestHandler = (text) => {
    setText(text);
    setSearch([]);
  }

  const onChangeHandler = (text) => {
    let matches = [];
    if(text.length>0){
      matches = resultado.filter(item => {
        return item.title
      })
    }
    console.log('matches', matches);
    setSearch(matches)
    setText(text)
  }

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