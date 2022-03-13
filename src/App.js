import './App.css';
import React from 'react';
import Wordle from './Wordle';
import { StateProvider } from './State';

function App() {
  let initialState = {
    submissions: [],
    active: [],
    shakeActive: false,
    danceActive: false,
    flipTiles: false,
    stopInteraction: false
  };
  return (
    <StateProvider initialState={initialState}>
      <Wordle />
    </StateProvider>
  );
}

export default App;
