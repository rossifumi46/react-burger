import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const orderURL = 'https://norma.nomoreparties.space/api/orders';

type TArgs = {
  ingredients: string[];
  token: string;
}

export const createOrderRequest = createAsyncThunk(
  'order/createOrderRequest',
  async ({ ingredients, token }: TArgs) => {
    const response = await fetch(orderURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ingredients }),
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

export default orderSlice.reducer;