import { v4 as uuid } from 'uuid';
import reducer, { addIngredient, removeIngredient, removeBun, moveIngredient } from './constructorSlice';

const initialState = {
  main: [],
  bun: null,
  counts: {},
};

const bun = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  name: "Краторная булка N-200i",
  price: 1255,
  proteins: 80,
  type: "bun",
  _id: "60d3b41abdacab0026a733c6",
  id: uuid(),
}

const ingredient = {
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: "https://code.s3.yandex.net/react/code/meat-03.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  name: "Филе Люминесцентного тетраодонтимформа",
  price: 988,
  proteins: 44,
  type: "main",
  _id: "60d3b41abdacab0026a733c8",
  id: uuid(),
}

const newIngredient = {
  calories: 420,
  carbohydrates: 33,
  fat: 244,
  image: "https://code.s3.yandex.net/react/code/meat-02.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  name: "Мясо бессмертных моллюсков Protostomia",
  price: 1337,
  proteins: 433,
  type: "main",
  _id: "60d3b41abdacab0026a733c9",
  id: uuid(),
}

const newState = {
  ...initialState,
  bun: bun,
  counts: {
    [bun._id]: 2,
  }
}

const newStateWithIngredient = {
  ...newState,
  main: [ ...newState.main, ingredient],
  counts: {
    ...newState.counts,
    [ingredient._id]: 1,
  }
}

const newStateWithIngredients = {
  ...newState,
  main: [ ...newState.main, ingredient, newIngredient],
  counts: {
    ...newState.counts,
    [ingredient._id]: 1,
    [newIngredient._id]: 1,
  }
}

describe('constructor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('add bun', () => {
    expect(
      reducer(initialState, addIngredient(bun))
    ).toEqual(newState)
  })

  it('add ingredient', () => {
    expect(
      reducer(newState, addIngredient(ingredient))
    ).toEqual(newStateWithIngredient)
  })

  it('remove bun', () => {
    expect(
      reducer(newState, removeBun())
    ).toEqual(initialState)
  })

  it('remove ingredient', () => {
    expect(
      reducer(newStateWithIngredient, removeIngredient(0))
    ).toEqual({
      ...newState,
      counts: {
        ...newState.counts,
        "60d3b41abdacab0026a733c8": 0,
      }
    })
  })

  it('move ingredient', () => {
    expect(
      reducer(newStateWithIngredients, moveIngredient([0, 1]))
    ).toEqual({
      ...newState,
      main: [ ...newState.main, newIngredient, ingredient],
      counts: {
        ...newState.counts,
        [ingredient._id]: 1,
        [newIngredient._id]: 1,
      }
    })
  })
}) 