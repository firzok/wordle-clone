import React from 'react';
import './GuessGrid.css';
import { useStateValue } from '../State';
export default function GuessGrid() {
  const [{ active, submissions, shakeActive, danceActive, flipTiles }, dispatch] = useStateValue();

  let emptyLength = 30 - active.length - submissions.length * 5;

  return (
    <div className='guess-grid'>
      {submissions.map((submission, i) => {
        if (i === submissions.length - 1) {
          return submission.map((s, j) => (
            <div
              className={`tile ${s.class} ${danceActive ? 'dance' : ''}`}
              key={`submission-${j}`}
            >
              {s.letter}
            </div>
          ));
        }
        return submission.map((s, j) => (
          <div className={`tile ${s.class}`} key={`submission-${j}`}>
            {s.letter}
          </div>
        ));
      })}
      {active.map((a, i) => (
        <div
          className={`${shakeActive ? 'tile active shake' : 'tile active'} ${
            flipTiles ? 'flip' : ''
          }`}
          key={`active-${i}`}
        >
          {a.letter}
        </div>
      ))}
      {[...Array(emptyLength)].map((_, i) => (
        <div className='tile' key={`tile-${i}`}></div>
      ))}
    </div>
  );
}
