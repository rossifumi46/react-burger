import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

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

export default constructorSlice.reducer;