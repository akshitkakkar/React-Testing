import axios from 'axios'

export const getSecretWord = async (setSecretWord) => {
    const respone = await axios.get('http://localhost:3030')
    setSecretWord(respone.data)
}

//default export for mocking convenience

export default {
    getSecretWord
}