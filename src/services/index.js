import { createSlice } from '@reduxjs/toolkit';

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    request: false,
    failed: false,
    ingredients: [],
  },
  reducers: {
    getIngredientsRequestStart: state => {
      state.request = true;
    },
    getIngredientsRequestFailed: state => {
      state.failed = true;
      state.request = false;
    },
    getIngredientsRequestSuccess: (state, action) => {
      state.request = false;
      state.ingredients = action.payload;
    },
  },
});

const {
  getIngredientsRequestStart,
  getIngredientsRequestFailed,
  getIngredientsRequestSuccess 
} = ingredientsSlice.actions;

const URL = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredientsRequest = () => async dispatch => {
  try {
    dispatch(getIngredientsRequestStart());
    const response = await fetch(URL);
    if (response.ok) {
      const { data } = await response.json();
      dispatch(getIngredientsRequestSuccess(data))
    } else {
      throw new Error(response.status + ': ' + response.statusText);
    }
  } catch (error) {
    console.log(error);
    dispatch(getIngredientsRequestFailed());
  }
}

const constructorSlice = createSlice({
  name: 'constructor',
  initialState: [],
  reducers: {
    getIngredients: (state) => state + 1,
  },
  });

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState: null,
  reducers: {
      setIngredient: (state, action) => action,
      getIngredient: state => state,
      cleanIngredient: state => null,
  },
});

export const { setIngredient, getIngredient } = currentIngredientSlice.actions;

const orderURL = 'https://norma.nomoreparties.space/api/orders';

const order = createSlice({
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

const { orderRequestStart, orderRequestSuccess, orderRequestFailed } = order.actions;

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