import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import api from '../api';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const response = await fetch(URL);
    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      throw new Error(response.status + ': ' + response.statusText);
    }
  }
)

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    request: false,
    failed: false,
    ingredients: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchIngredients.pending, state => {
        state.request = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.request = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, state => {
        state.request = false;
        state.failed = true;
      })
  }
});

const constructorSlice = createSlice({
  name: 'builder',
  initialState: {
    main: [],
    bun: null,
    counts: {},
  },
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type !== 'bun') {
        const newIngredient = {
          id: uuid(),
          ...action.payload,
        };
        state.counts[action.payload._id] = state.counts[action.payload._id] ? state.counts[action.payload._id] + 1 : 1
        state.main.push(newIngredient);
      } else {
        if (state.bun) state.counts[state.bun._id] = null;
        state.bun = action.payload;
        state.counts[action.payload._id] = 2;
      }
    },
    removeIngredient: (state, action) => {
      state.counts[state.main[action.payload]._id] =
        state.counts[state.main[action.payload]._id] > 1
        ? state.counts[state.main[action.payload]._id] - 1
        : null;
      state.main = state.main.filter((_, index) => index !== action.payload);
    },
    removeBun: state => {
      delete state.counts[state.bun._id];
      state.bun = null;
    },
    moveIngredient: (state, action) => {
      const [dragIndex, hoverIndex] = action.payload;
      state.main.splice(hoverIndex, 0, state.main.splice(dragIndex, 1)[0]);
    }
  },
});

export const { addIngredient, removeIngredient, moveIngredient, removeBun } = constructorSlice.actions;

const orderURL = 'https://norma.nomoreparties.space/api/orders';

export const createOrderRequest = createAsyncThunk(
  'order/createOrderRequest',
  async (order) => {
    const response = await fetch(orderURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(order),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(response.status + ': ' + response.statusText);
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderRequestStart: false,
    orderRequestFailed: false,
    orderDetails: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createOrderRequest.pending, state => {
        state.orderRequestStart = true;
      })
      .addCase(createOrderRequest.fulfilled, (state, action) => {
        state.orderRequestStart = false;
        state.orderDetails = action.payload;
      })
      .addCase(createOrderRequest.rejected, state => {
        state.orderRequestStart = false;
        state.orderRequestFailed = true;
      })
  }
});

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

export const { setTokenAction } = authSlice.actions

const reducer = {
  ingredients: ingredientsSlice.reducer,
  builder: constructorSlice.reducer,
  order: orderSlice.reducer,
  auth: authSlice.reducer,
}

export default reducer;