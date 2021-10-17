import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const loginRequest = createAsyncThunk(
  'auth/loginRequest',
  async (body) => {
    const data = await api.login(body);
    if (data === 'error') throw new Error();
    localStorage.setItem("accessToken", data.accessToken.split("Bearer ")[1]);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  }
);

export const registerRequest = createAsyncThunk(
  'auth/registerRequest',
  async (body) => {
    const data = await api.register(body);
    if (data === 'error') throw new Error();
    return data;
  }
);

export const userRequest = createAsyncThunk(
  'auth/userRequest',
  async (token) => {
    const response = await api.getProfile(token);
    if (!response.success) throw new Error();
    return response.user;
  }
);

export const updateProfileRequest = createAsyncThunk(
  'auth/updateProfileRequest',
  async ({ token, body }) => {
    const response = await api.updateProfile({ token, body });
    if (!response.success) throw new Error();
    return response.user;
  }
);

export const logoutRequest = createAsyncThunk(
  'auth/logoutRequest',
  async (info) => {
    const response = await api.logout();
    if (!response.success) throw new Error();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return response.user;
  }
);

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokenAction: (state, action) => {
      state.accessToken = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginRequest.pending, state => {
        state.loginRequestStart = true;
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        state.loginRequestStart = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken.split("Bearer ")[1];
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginRequest.rejected, state => {
        state.loginRequestStart = false;
        state.loginRequestFailed = true;
      })
      .addCase(registerRequest.pending, state => {
        state.registerRequestStart = true;
      })
      .addCase(registerRequest.fulfilled, (state, action) => {
        state.registerRequestStart = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken.split("Bearer ")[1];
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(registerRequest.rejected, state => {
        state.registerRequestStart = false;
        state.registerRequestFailed = true;
      })
      .addCase(userRequest.pending, state => {
        state.userRequestStart = true;
      })
      .addCase(userRequest.fulfilled, (state, action) => {
        state.userRequestStart = false;
        state.user = action.payload;
      })
      .addCase(userRequest.rejected, state => {
        state.userRequestStart = false;
        state.userRequestFailed = true;
      })
      .addCase(updateProfileRequest.pending, state => {
        state.updateProfileRequestStart = true;
      })
      .addCase(updateProfileRequest.fulfilled, (state, action) => {
        state.updateProfileRequestStart = false;
        state.user = action.payload;
      })
      .addCase(updateProfileRequest.rejected, state => {
        state.updateProfileRequestStart = false;
        state.updateProfileRequestFailed = true;
      })
      .addCase(logoutRequest.pending, state => {
        state.logoutRequestStart = true;
      })
      .addCase(logoutRequest.fulfilled, _ => initialState)
      .addCase(logoutRequest.rejected, state => {
        state.logoutRequestStart = false;
        state.logoutRequestFailed = true;
      })
  }
});

export const { setTokenAction } = authSlice.actions;

export default authSlice.reducer;