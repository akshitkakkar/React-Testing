const languageStrings = {
    en: {
        congrats: 'Congratulation, you guessed the word!',
        submit: 'Submit',
        guessPrompt: 'Try to guess the secret word!',
        guessInputPlaceholder: 'Enter guess',
        guessColumnHeader: 'Guessed words',
        guessedWords: 'Guesses',
        matchingLettersColumnHeader: 'Matching Letters'
    },
    emoji: {
        congrats: 'congoxxxxxxxxx',
        submit: 'submit KING',
        guessPrompt: 'guess u king',
        guessInputPlaceholder: 'feed me king',
        guessColumnHeader: 'omg U KWEEEN',
        guessedWords: 'SLAYinnnnnnn',
        matchingLettersColumnHeader: 'way to gooo xxxxxxxoxoxoxoxoxoxo'
    }
}

function getStringByLanguage(languageCode, stringKey, strings=languageStrings) {
    if(!strings[languageCode] || !strings[languageCode][stringKey]) {
        console.warn(`Could not get string [${stringKey}] for [${languageCode}]`)
        
        return strings.en[stringKey]
    }
    return strings[languageCode][stringKey]
}

export default {
    getStringByLanguage
}