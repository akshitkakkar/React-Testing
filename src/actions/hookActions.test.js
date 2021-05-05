import moxios from 'moxios'

import {getSecretWord} from './hookActions'

describe('moxios tests', () => {
    beforeEach(() => {
        moxios.install() //lets moxios receive axios request instead of http
    })
    afterEach(() => {
        moxios.uninstall() //returning axios to its http state
    })

    test('calls the getSecretWord callback on axios response', async () => {
        const secretWord = 'party'

        moxios.wait(() => {
            //axios call during the tests - we get most recent call
            const request = moxios.requests.mostRecent()
            //respond with secret word and 200 status
            request.respondWith({
                status: 200,
                response: secretWord
            })
        })

        //callback mock
        const mockSetSecretWord = jest.fn()

        await getSecretWord(mockSetSecretWord)

        //assertion after response is finished
        //check if mock was run with correct argument

        expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord)
    })
})