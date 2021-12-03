import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../../types';

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

type TIngredientsSliceState = {
  request: boolean;
  failed: boolean;
  ingredients: TIngredient[];
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    request: false,
    failed: false,
    ingredients: [],
  } as TIngredientsSliceState,
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

export default ingredientsSlice.reducer;