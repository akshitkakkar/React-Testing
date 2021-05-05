import React from 'react'
import propTypes from 'prop-types'
import languageContext from './contexts/languageContext'
import stringsModule from './helpers/strings'
import strings from './helpers/strings'

const Input = ({secretWord}) => {
    const language = React.useContext(languageContext)
    const [currentGuess, setCurrentGuess] = React.useState('') //to help with mock
    return(
        <div data-test="component-input">
            <form className="form-inline">
                <input data-test="input-box"
                className="mb-2 mx-sm-3"
                type="text"
                placeholder={strings.getStringByLanguage(language, 'guessInputPlaceholder')}
                value={currentGuess}
                onChange={(event) => setCurrentGuess(event.target.value)}/>

                <button data-test="submit-button"
                onClick={(e) => {
                    e.preventDefault()
                    setCurrentGuess("")
                }}
                className="btn btn-primary mb-2">
                {strings.getStringByLanguage(language, 'submit')}
            </button>
            </form>
        </div>
    )
}

Input.propTypes = {
    secretWord: propTypes.string.isRequired
}

export default Input