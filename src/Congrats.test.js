import React from 'react'
import Enzyme, {shallow, mount} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import {findByTestAttr, checkProps} from '../test/testUtils'

import Congrats from './Congrats'
import languageContext from './contexts/languageContext'

const defaultProps = {success: false}

const setup = ({success, language}) => {
    // const setupProps = {...defaultProps, ...props} //override default props with supplied props
    // return shallow(<Congrats {...setupProps}/>)

    language = language || 'en'
    success = success || false
    return mount(
        <languageContext.Provider value={language}>
            <Congrats success={success}/>
        </languageContext.Provider>
    )
}

describe('languagePicker', () => {
    test('correctly renders congrats string in english', () => {
        const wrapper = setup({success: true})
        expect(wrapper.text()).toBe("Congratulation, you guessed the word!")
    })

    test('correctly renders congrats string in emoji', () => {
        const wrapper = setup({success: true, language: 'emoji'})
        expect(wrapper.text()).toBe("congoxxxxxxxxx")
    })
})

test('renders without error', () => {
    const wrapper = setup({success: false})
    const component = findByTestAttr(wrapper, 'component-congrats')
    expect(component.length).toBe(1)
})

test('renders no text when `success` prop is false', () => {
    const wrapper = setup({success: false})
    const component = findByTestAttr(wrapper, 'component-congrats')
    expect(component.text()).toBe('')
})

test('renders non empty congrats message when `success` prop is true', () => {
    const wrapper = setup({success: true})
    const message = findByTestAttr(wrapper, 'congrats-message')
    expect(message.text().length).not.toBe(0)
})

test('does not throw warning with expected props', () => {

     const expectedProps = {success: false} //value can also be true, just checking type
     checkProps(Congrats, expectedProps); //assertion for test in checkProps function
    // const propError = checkPropTypes(Congrats.propTypes, expectedProps, 'prop', Congrats.name)
    // //if no propTypes defined we won't get anything wrong with the test
    // expect(propError).toBeUndefined()
})