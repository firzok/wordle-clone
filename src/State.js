import React, { createContext, useContext, useReducer } from 'react';

const WordleContext = createContext();

export const ACTIONS = {
  PUSHSUBMISSION: 'push-submission',
  SETACTIVE: 'set-active',
  SHAKEACTIVE: 'shake-active',
  DANCEACTIVE: 'dance-active',
  FLIPTILES: 'flip-tiles',
  SUBMITGUESS: 'submit-guess',
  NEWSUBMISSION: 'new-submission',
  STOPINTERACTION: 'stop-interaction'
};

function reducer(state, action) {
  if (state.stopInteraction) return state;

  switch (action.type) {
    case ACTIONS.PUSHSUBMISSION:
      return { ...state, submissions: [...state.submissions, action.payload] };

    case ACTIONS.SETACTIVE:
      return { ...state, active: action.payload };

    case ACTIONS.SHAKEACTIVE:
      return { ...state, shakeActive: action.payload };

    case ACTIONS.DANCEACTIVE:
      return { ...state, danceActive: action.payload };

    case ACTIONS.FLIPTILES:
      return { ...state, flipTiles: action.payload };

    case ACTIONS.STOPINTERACTION:
      return { ...state, stopInteraction: true };

    case ACTIONS.NEWSUBMISSION:
      return {
        ...state,
        active: [],
        flipTiles: false,
        submissions: [...state.submissions, action.payload]
      };

    default:
      return state;
  }
}

export const StateProvider = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <WordleContext.Provider value={[state, dispatch]}>{children}</WordleContext.Provider>;
};

export const useStateValue = () => useContext(WordleContext);
