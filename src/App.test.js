import React from 'react';
import {mount} from 'enzyme'
import {findByTestAttr} from '../test/testUtils'
import App from './App';

import hookActions from './actions/hookActions'
//to replace property of module with our mock'

const mockGetSecretWord = jest.fn() //spy that it runs only in a proper place

const setup = (secretWord="party") => {
  mockGetSecretWord.mockClear()
  //clear to make sure any calls from previous tests aren't muddying up the results in later tests
  //we do not have to carry on previous test results
  hookActions.getSecretWord = mockGetSecretWord

  const mockUserReducer = jest.fn()
  .mockReturnValue([
    {secretWord, language: 'en'},
    jest.fn()
  ])

  React.useReducer = mockUserReducer;

  return mount(<App/>) //renders child components as well - returns ReactWrapper and not ShallowWrapper
}

test('App renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, "component-app")
  expect(component.length).toBe(1)
});

describe('getSecretWord calls', () => {
  test('getSecretWord gets called on App mount', () => {
    setup()

    //check to see if the secret word was updated

    expect(mockGetSecretWord).toHaveBeenCalled()
  })

  test('secretWord does not update on App update', () => {
    const wrapper = setup()

    mockGetSecretWord.mockClear() //starting fresh after setup when useEffect called once on App mount

    //wrapper.update() triggers update????
    wrapper.setProps()

    expect(mockGetSecretWord).not.toHaveBeenCalled()
  })
})

describe("secretWord is not null", () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup("party")
  })

  test("renders app when secretWord is not null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app")
    expect(appComponent.exists()).toBe(true)
  })

  test("does not render spinner when secretWord is not null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner")
    expect(spinnerComponent.exists()).toBe(false)
  })
})

describe("secretWord is null", () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup(null)
  })

  test("renders spinner when secretWord is null", () => {
    const appComponent = findByTestAttr(wrapper, "spinner")
    expect(appComponent.exists()).toBe(true)
  })

  test("does not render app when secretWord is null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "component-app")
    expect(spinnerComponent.exists()).toBe(false)
  })
})
