import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import fetchMock from 'fetch-mock'

import reducer, { setTokenAction, loginRequest, registerRequest, userRequest, updateProfileRequest, logoutRequest } from './slices/authSlice';
import authSlice from './slices/authSlice';

const action = loginRequest.pending();

const loginFulfilled = loginRequest.fulfilled(
  {
    user: 'fake',
    accessToken: 'fake',
    refreshToken: 'fake'
  },
  'auth/loginRequest',
  {
    email: 'rossifumi.gp@gmail.com',
    password: 'password',
  }
);
console.log(loginFulfilled);

const initialState = {
  loginRequestStart: false,
  loginRequestFailed: false,

  registerRequestStart: false,
  registerRequestFailed: false,

  userRequestStart: false,
  userRequestFailed: false,

  updateProfileRequestStart: false,
  updateProfileRequestFailed: false,

  logoutRequestStart: false,
  logoutRequestFailed: false,

  accessToken: "",
  refreshToken: "",

  user: null,
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('login request start', () => {
    expect(
      reducer(initialState, action)
    ).toEqual({
      ...initialState,
      loginRequestStart: true,
    })
  })
  console.log(setTokenAction('fake'))
  it('set token', () => {
    expect(reducer(initialState, setTokenAction('fake'))).toEqual(
      {
        ...initialState,
        accessToken: 'fake'
      }
    )
  })

  it('login request success', async () => {
    expect(
      reducer(initialState, loginFulfilled)
    ).toEqual({
      ...initialState,
      loginRequestStart: false,
      user: 'fake',
      accessToken: 'fake',
      refreshToken: 'fake',
    })
  })
}) 