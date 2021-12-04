import reducer, { setTokenAction, loginRequest, registerRequest, userRequest, updateProfileRequest, logoutRequest } from './authSlice';

const loginPending = loginRequest.pending();

const loginFulfilled = loginRequest.fulfilled(
  {
    user: 'fake',
    accessToken: 'Bearer fake',
    refreshToken: 'fake'
  },
  'auth/loginRequest',
  {
    email: 'rossifumi.gp@gmail.com',
    password: 'password',
  }
);

const loginRejected = loginRequest.rejected(new Error());

const registerPending = registerRequest.pending();

const registerFulfilled = registerRequest.fulfilled(
  {
    user: 'fake',
    accessToken: 'Bearer fake',
    refreshToken: 'fake'
  },
);

const registerRejected = registerRequest.rejected(new Error());

const userPending = userRequest.pending();

const userFulfilled = userRequest.fulfilled(
  'fake',
);

const userRejected = userRequest.rejected(new Error());

const updateProfilePending = updateProfileRequest.pending();

const updateProfileFulfilled = updateProfileRequest.fulfilled(
  'fake',
);

const updateProfileRejected = updateProfileRequest.rejected(new Error());

const logoutPending = logoutRequest.pending();

const logoutFulfilled = logoutRequest.fulfilled();

const logoutRejected = logoutRequest.rejected(new Error());


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
      reducer(initialState, loginPending)
    ).toEqual({
      ...initialState,
      loginRequestStart: true,
    })
  })

  it('login request success', () => {
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

  it('login request failed', () => {
    expect(
      reducer(initialState, loginRejected)
    ).toEqual({
      ...initialState,
      loginRequestStart: false,
      loginRequestFailed: true,
    })
  })

  it('set token', () => {
    expect(reducer(initialState, setTokenAction('fake'))).toEqual(
      {
        ...initialState,
        accessToken: 'fake'
      }
    )
  })

  it('register request start', () => {
    expect(
      reducer(initialState, registerPending)
    ).toEqual({
      ...initialState,
      registerRequestStart: true,
    })
  })

  it('register request success', () => {
    expect(
      reducer(initialState, registerFulfilled)
    ).toEqual({
      ...initialState,
      registerRequestStart: false,
      user: 'fake',
      accessToken: 'fake',
      refreshToken: 'fake',
    })
  })

  it('register request failed', () => {
    expect(
      reducer(initialState, registerRejected)
    ).toEqual({
      ...initialState,
      registerRequestStart: false,
      registerRequestFailed: true,
    })
  })

  it('user request start', () => {
    expect(
      reducer(initialState, userPending)
    ).toEqual({
      ...initialState,
      userRequestStart: true,
    })
  })

  it('user request success', () => {
    expect(
      reducer(initialState, userFulfilled)
    ).toEqual({
      ...initialState,
      userRequestStart: false,
      user: 'fake',
    })
  })

  it('user request failed', () => {
    expect(
      reducer(initialState, userRejected)
    ).toEqual({
      ...initialState,
      userRequestStart: false,
      userRequestFailed: true,
    })
  })

  it('update profile request start', () => {
    expect(
      reducer(initialState, updateProfilePending)
    ).toEqual({
      ...initialState,
      updateProfileRequestStart: true,
    })
  })

  it('update profile request success', () => {
    expect(
      reducer(initialState, updateProfileFulfilled)
    ).toEqual({
      ...initialState,
      updateProfileRequestStart: false,
      user: 'fake',
    })
  })

  it('update profile request failed', () => {
    expect(
      reducer(initialState, updateProfileRejected)
    ).toEqual({
      ...initialState,
      updateProfileRequestStart: false,
      updateProfileRequestFailed: true,
    })
  })

  it('logout request start', () => {
    expect(
      reducer(initialState, logoutPending)
    ).toEqual({
      ...initialState,
      logoutRequestStart: true,
    })
  })

  it('logout request success', () => {
    expect(
      reducer(initialState, logoutFulfilled)
    ).toEqual(initialState)
  })

  it('logout request failed', () => {
    expect(
      reducer(initialState, logoutRejected)
    ).toEqual({
      ...initialState,
      logoutRequestStart: false,
      logoutRequestFailed: true,
    })
  })
})