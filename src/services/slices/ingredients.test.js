import reducer, { fetchIngredients } from './ingredientsSlice';

const fetchPending = fetchIngredients.pending();

const fetchFulfilled = fetchIngredients.fulfilled(
  'fake',
);

const fetchRejected = fetchIngredients.rejected(new Error());

const initialState = {
  request: false,
  failed: false,
  ingredients: [],
};

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('fetch start', () => {
    expect(
      reducer(initialState, fetchPending)
    ).toEqual({
      ...initialState,
      request: true,
    })
  })

  it('fetch success', async () => {
    expect(
      reducer(initialState, fetchFulfilled)
    ).toEqual({
      ...initialState,
      request: false,
      ingredients: 'fake',
    })
  })

  it('fetch failed', async () => {
    expect(
      reducer(initialState, fetchRejected)
    ).toEqual({
      ...initialState,
      request: false,
      failed: true,
    })
  })
}) 