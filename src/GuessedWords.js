import React from 'react'
import propTypes, { string } from 'prop-types'
import languageContext from './contexts/languageContext'
import stringsModule from './helpers/strings'

const GuessedWords = (props) => {
    const language = React.useContext(languageContext)
    let contents
    if(props.guessedWords.length === 0) {
        contents = (
            <span data-test="guess-instructions">
                {stringsModule.getStringByLanguage(language, 'guessPrompt')}
            </span>
        )
    }
    else {
        const guessedWordRows = props.guessedWords.map((word,index) => (
            <tr data-test="guessed-word" key={index}>
               <td>{word.guessedWord}</td>
               <td>{word.letterMatchCount}</td> 
            </tr>
        ))
        contents = (
            <div data-test="guessed-words">
                <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
                <table className="table table-sm">
                    <thead className="thead-light">
                        <tr>
                            <th>{stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</th>
                            <th>{stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
                            </tr>
                    </thead>
                    <tbody>
                        {guessedWordRows}
                    </tbody>
                </table>
            </div>
        )
    }
    return(
        <div data-test="component-guessed-words">
            {contents}
        </div>
    )
}

GuessedWords.propTypes = {
    guessedWords: propTypes.arrayOf(
        propTypes.shape({ //object shape
            guessedWord: propTypes.string.isRequired,
            letterMatchCount: propTypes.number.isRequired
        })
    ).isRequired
}

export default GuessedWords