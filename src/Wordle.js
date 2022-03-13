import React, { useState } from 'react';
import GuessGrid from './GuessGrid/GuessGrid';
import Keyboard from './Keyboard/Keyboard';
import { targetwords, dictionary } from './wordList';
import { useStateValue, ACTIONS } from './State';

export default function Wordle() {
  const [alerts, setAlert] = useState([]);

  const [{ active, submissions, stopInteraction }, dispatch] = useStateValue();

  const offsetFromDate = new Date(2022, 0, 1);
  const msOffset = Date.now() - offsetFromDate;
  const dayOffset = msOffset / 1000 / 60 / 60 / 24;
  const targetWord = targetwords[Math.floor(dayOffset)];

  const submitGuess = () => {
    if (stopInteraction) return;
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

    dispatch({ type: ACTIONS.FLIPTILES, payload: true });
    setTimeout(() => {
      dispatch({ type: ACTIONS.NEWSUBMISSION, payload: submission });

      if (word === targetWord || submissions.length === 6) {
        if (word === targetWord) {
          showAlert('Word Found');
          danceTiles();
        } else {
          showAlert('Word Not Found');
        }
        dispatch({ type: ACTIONS.STOPINTERACTION });
      }
    }, 500);
  };
  const showAlert = text => {
    setAlert(alerts => [...alerts, text]);

    setTimeout(() => {
      setAlert(alerts => alerts.slice(0, alerts.length - 1));
    }, 1000);
  };
  const shakeTiles = () => {
    dispatch({ type: ACTIONS.SHAKEACTIVE, payload: true });

    setTimeout(() => {
      dispatch({ type: ACTIONS.SHAKEACTIVE, payload: false });
    }, 1000);
  };
  const danceTiles = () => {
    dispatch({ type: ACTIONS.DANCEACTIVE, payload: true });

    setTimeout(() => {
      dispatch({ type: ACTIONS.DANCEACTIVE, payload: false });
    }, 1000);
  };

  return (
    <div className='App'>
      <div className='alert-container'>
        {alerts.map((text, i) => (
          <div className='alert' key={i}>
            {text}
          </div>
        ))}
      </div>
      <GuessGrid />
      <Keyboard submitGuess={submitGuess} />
    </div>
  );
}
