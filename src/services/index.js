import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    try {
      const response = await fetch(URL);
      if (response.ok) {
        const { data } = await response.json();
        return data;
      } else {
        throw new Error(response.status + ': ' + response.statusText);
      }
    } catch (error) {
      console.log(error);
      return;
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
  name: 'constructor',
  initialState: {
    ingredients: [],
  },
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
  },
});

export const { getIngredient, addIngredient } = constructorSlice.actions;

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState: null,
  reducers: {
      setIngredient: (state, action) => action,
      cleanIngredient: state => null,
  },
});

export const { setIngredient, cleanIngredient } = ingredientSlice.actions;

const orderURL = 'https://norma.nomoreparties.space/api/orders';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderRequestStart: false,
    orderRequestFailed: false,
    order: [],
    orderDetails: null,
  },
  reducers: {
    orderRequestStart: state => state.orderRequestStart = true,
    orderRequestSuccess: (state, action) => {
      state.orderRequestStart = false;
      state.orderDetails = action.payload;
    },
    orderRequestFailed: state => state.orderRequestFailed = false,
  },
});

const { orderRequestStart, orderRequestSuccess, orderRequestFailed } = orderSlice.actions;

export const orderRequest = (order) => async dispatch => {
  try {
    dispatch(orderRequestStart());
    const response = await fetch(orderURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(order),
    });
    if (response.ok) {
      const { data } = await response.json();
      dispatch(orderRequestSuccess(data))
    } else {
      throw new Error(response.status + ': ' + response.statusText);
    }
  } catch (error) {
    console.log(error);
    dispatch(orderRequestFailed);
  }
}

const reducer = {
  ingredients: ingredientsSlice.reducer,
  ingredient: ingredientSlice.reducer,
  constructor: constructorSlice.reducer,
  order: orderSlice.reducer,
}

export default reducer;