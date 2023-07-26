import logo from './logo.svg';
import './App.css';
import MainButton from './components/MainButton.js';
import IncrementButton from './components/IncrementButton';
import { useCallback, useState } from 'react';

function App() {
  const [toggled, setToggled] = useState(false);
  const [count, setCount] = useState(0);

  const handleClickMainButton = useCallback(() => {
    setToggled(!toggled);
    setCount(count => count - 1);
  }, [toggled]);

  const handleClickIncrementButton = useCallback(() => {
    setCount(count => count + 1);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <p>
            <MainButton onClick={handleClickMainButton} toggled={toggled}/>
          </p>
          <p>
            <IncrementButton onClick={handleClickIncrementButton} count={count}></IncrementButton>
          </p>
      </header>
    </div>
  );
}

export default App;
