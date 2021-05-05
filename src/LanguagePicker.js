import React from 'react'
import propTypes from 'prop-types'

function LanguagePicker({setLanguage}) {
    const languages = [
        {code: 'en', symbol: 'English'},
        {code: 'emoji', symbol: 'STANNNNNN'}
    ]

    const languageIcons = languages.map(lang => 
        <span data-test="language-icon"
        key={lang.code}
        onClick={() => setLanguage(lang.code)}
        >
            {lang.symbol}
        </span>
    )
    return (
        <div data-test="component-language-picker">
            {languageIcons}
        </div>
    )
}

LanguagePicker.porpTypes = {
    setLanguage: propTypes.func.isRequired
}

export default LanguagePicker