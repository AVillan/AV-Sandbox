import logo from './logo.svg';
import './App.css';
import MainButton from './components/MainButton.js';
import { useState } from 'react';

function App() {
  const [toggled, setToggled] = useState(false);

  function handleClick(){
    setToggled(!toggled);
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <MainButton onClick={handleClick} toggled={toggled}/>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
