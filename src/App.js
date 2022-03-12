import GuessGrid from './GuessGrid/GuessGrid';
import './App.css';
import Keyboard from './Keyboard/Keyboard';
import { targetwords, dictionary } from './wordList';
import React, { useState } from 'react';

function App() {
  const [submissions, setSubmissions] = useState([]);
  const [active, setActive] = useState([]);
  const [alerts, setAlert] = useState([]);
  const [shakeActive, setShakeActive] = useState(false);
  const [danceActive, setDanceActive] = useState(false);
  const [flipTiles, setFlipTiles] = useState(false);

  const offsetFromDate = new Date(2022, 0, 1);
  const msOffset = Date.now() - offsetFromDate;
  const dayOffset = msOffset / 1000 / 60 / 60 / 24;
  const targetWord = targetwords[Math.floor(dayOffset)];

  const submitGuess = () => {
    let wordArray = active.map(a => a.letter.toLowerCase());
    let word = wordArray.join('');
    if (wordArray.length !== targetWord.length) {
      showAlert('Not enough letters.');
      shakeTiles();
      return;
    }
    if (!dictionary.includes(word)) {
      showAlert('Not in word list.');
      shakeTiles();
      return;
    }

    let submission = wordArray.map((char, i) => {
      if (char === targetWord[i]) {
        return { letter: char, class: 'correct' };
      } else if (targetWord.includes(char)) {
        return { letter: char, class: 'wrong-location' };
      } else {
        return { letter: char, class: 'wrong' };
      }
    });

    setFlipTiles(true);
    setTimeout(() => {
      setFlipTiles(false);
      setSubmissions(submissions => [...submissions, submission]);
      setActive([]);

      if (word === targetWord || submissions.length === 6) {
        if (word === targetWord) {
          showAlert('Word Found');
          danceTiles();
        } else {
          showAlert('Word Not Found');
        }
        stopInteraction();
      }
    }, 500);
  };
  const stopInteraction = () => {};
  const showAlert = text => {
    setAlert(alerts => [...alerts, text]);
    setTimeout(() => {
      setAlert(alerts => alerts.slice(0, alerts.length - 1));
    }, 1000);
  };
  const shakeTiles = () => {
    setShakeActive(true);
    setTimeout(() => {
      setShakeActive(false);
    }, 1000);
  };
  const danceTiles = () => {
    setDanceActive(true);
    setTimeout(() => {
      setDanceActive(false);
    }, 1000);
  };

  return (
    <div className='App'>
      <div className='alert-container'>
        {alerts.map((text, i) => (
          <div className='alert'>{text}</div>
        ))}
      </div>
      <GuessGrid
        active={active}
        shakeActive={shakeActive}
        flipTiles={flipTiles}
        danceActive={danceActive}
        submissions={submissions}
      />
      <Keyboard
        active={active}
        setActive={setActive}
        submissions={submissions}
        submitGuess={submitGuess}
      />
    </div>
  );
}

export default App;
