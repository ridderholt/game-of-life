import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Board from './game/components/Board';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        Game of life
      </header>
      <Provider store={store}>
        <Board />
      </Provider>
    </div>
  );
}

export default App;
