import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Main = () => {

  //se crea un state para el error
  const [error, guardarError] = useState(false);
  const [text, setText] = useState('');
  const [search, setSearch] = useState([]);
  const [resultado, guardarResultado] = useState([]);
  const [consultar, guardarConsultar] = useState(false)

    useEffect(() => {
        const consultarAPI = async () => {
        const api = await axios.get('https://api.github.com/search/issues?q=repo:facebook/react+debug:in:title');
        console.log(api.data.items);
        guardarResultado(api.data.items)
        console.log(resultado);
        }
    consultarAPI();
    }, []);

    const onSuggestHandler = (text) => {
        setText(text);
        setSearch([]);
    }
    
    const onChangeHandler = (text) => {
        let matches = [];
        if(text.length > 0){
            matches = resultado.filter(item => {
                console.log(item.title);
                return item.title
            })
      }
      console.log('matches', matches);
      setSearch(matches);
      setText(text);
    }

  const handleSubmit = e => {
    e.preventDefault();

    //validar
    if(text.trim() === ''){
      guardarError(true);
      return;
    }

    guardarError(false);

    guardarConsultar(true);
  }

  return(
    <div>
        <div className="container">
      <form
        onSubmit={handleSubmit}
      >
        <div id="circles-container">
          <div id="circles">
            <div id="red-circle"></div>
            <div id="yellow-circle"></div>
            <div id="green-circle"></div>
          </div>
          <div id="character">&times;</div>
        </div>
        {error ? <p id="error-text">Debes colocar un valor</p> : null }
        <div id="input-container">
          <input 
            type="text"
            name="title"
            id= "title"
            onChange={e => onChangeHandler(e.target.value)}
             value={text}
            placeholder="Search"
          />
        {search && search.map((search, i) => 
        <div key={i} className="suggestion"
            onClick={() => onSuggestHandler(search.title)}
        >{search.title}</div>
        )}
        </div>
      </form>
    </div>
    <div className="container">
      <form>
        <div id="circles-container">
          <div id="circles">
            <div id="red-circle"></div>
            <div id="yellow-circle"></div>
            <div id="green-circle"></div>
          </div>
          <div id="character">&times;</div>
        </div>
        <div id="input-container">
          <div id="result-title">
            <h1 id="result-text"><strong>Bug</strong></h1>
          </div>
          <div id="result-container">
            <p id="result-text"
                onClickCapture={e => onChangeHandler(e.target.value)}
                value={text}
            >{text}</p>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Main;