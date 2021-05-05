import React, {Component} from 'react';
import './App.css';
import hookActions from './actions/hookActions';
import languageContext from './contexts/languageContext'

import Input from './Input';
import LanguagePicker from './LanguagePicker'

function reducer(state, action) { //state sent automatically by dispatch
  //reducer returns a new state and is called automatically by dispatch
  switch(action.type) {
    case 'setSecretWord':
      return {...state, secretWord: action.payload}
    case "setLanguage":
      return {...state, language: action.payload}
    default:
      throw new Error('Invalid action type' + action.type)
  }
}

function App() {
  const [state, dispatch] = React.useReducer(
    reducer,
    {secretWord: null, language: 'en' }
    )

    const setLanguage = (language) => dispatch({
      type: 'setLanguage',
      payload: language
    })

    const setSecretWord = (secretWord) => dispatch({
      type: 'setSecretWord',
      payload: secretWord
    })

    React.useEffect(() => {
      hookActions.getSecretWord(setSecretWord)
    }, [])

    if(!state.secretWord) {
      return (
        <div className="container" data-test="spinner">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p>Loading secret word</p>
        </div>
      )
    }

    return (
      <div className="container" data-test="component-app">
        <h1>Jotto</h1>
        <languageContext.Provider value={state.language}>
          <LanguagePicker setLanguage={setLanguage}/>
          <Input secretWord={state.secretWord}/>
        </languageContext.Provider>
      </div>
      //anywhere within Provider we can access languageContext value
      //rerenders children when value in Provider changes
    )
}

export default App;
