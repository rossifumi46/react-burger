import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

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

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: null,
  reducers: {
      setIngredient: (_, action) => action.payload,
      cleanIngredient: () => null,
  },
});

export const { setIngredient, cleanIngredient } = ingredientSlice.actions;

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

const reducer = {
  ingredients: ingredientsSlice.reducer,
  ingredient: ingredientSlice.reducer,
  builder: constructorSlice.reducer,
  order: orderSlice.reducer,
}

export default reducer;