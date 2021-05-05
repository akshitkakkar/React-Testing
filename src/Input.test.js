import React from 'react'
import {shallow, mount} from 'enzyme'
import {findByTestAttr, checkProps} from '../test/testUtils'
import Input from './Input'
import languageContext from './contexts/languageContext'

const setup = ({secretWord, language}) => {
    // return shallow(<Input secretWord={secretWord}/>)
    language = language || 'en'
    secretWord = secretWord || "party"

    return mount(
        <languageContext.Provider value={language}>
            <Input secretWord={secretWord}/>
        </languageContext.Provider>
    )
}

describe('languagePicker', () => {
    test('correctly renders submit string in english', () => {
        const wrapper = setup({})
        const submitButton = findByTestAttr(wrapper, "submit-button")
        expect(submitButton.text()).toBe("Submit")
    })

    test('correctly renders submit string in emoji', () => {
        const wrapper = setup({language: 'emoji'})
        const submitButton = findByTestAttr(wrapper, "submit-button")
        expect(submitButton.text()).toBe("submit KING")
    })
})

test('Input renders without error', () => {
    const wrapper = setup({})
    const component = findByTestAttr(wrapper, "component-input")
    expect(component.length).toBe(1)
})

test('does not throw warning with expected props', () => {
    const expectedProps = {secretWord: "party"}
    checkProps(Input, expectedProps)
})

describe('state controlled input field', () => {
    let mockSetCurrentGuess = jest.fn()
    let wrapper
    beforeEach(() => {
        mockSetCurrentGuess.mockClear() //clear any memory from previous test
        //fn to watch for setCurrentGuess
        //mock that jest will be watching
        //useState returns an array with 'mockSetCurrentGuess' as 2nd item
        mockSetCurrentGuess = jest.fn(); //spy in
        React.useState = jest.fn(() => ["", mockSetCurrentGuess]) //replaced useState with another mock that returns a value
        //so instead of working with useState test works with the mock function/replacement function
        wrapper = setup({})
    })
    test('state updates with value of input box upon change', () => {
        const inputBox = findByTestAttr(wrapper, "input-box")
        //mock event to simulate event in input box
        //apply that as change event to input box
        const mockEvent = {target: {value: "train"}}
        inputBox.simulate("change", mockEvent) //simulating input box getting value of train

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
    })
    test('field is cleared upon submit button click', () => {
        const submitButton = findByTestAttr(wrapper, "submit-button")
        submitButton.simulate("click", {preventDefault() {}})

        expect(mockSetCurrentGuess).toHaveBeenCalledWith("")
    })
})