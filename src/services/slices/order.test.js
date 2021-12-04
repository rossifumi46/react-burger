import reducer, { createOrderRequest } from './orderSlice';

const orderPending = createOrderRequest.pending();

const orderFulfilled = createOrderRequest.fulfilled(
  'fake',
);

const orderRejected = createOrderRequest.rejected(new Error());

const initialState = {
  orderRequestStart: false,
  orderRequestFailed: false,
  orderDetails: null,
};

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('order request start', () => {
    expect(
      reducer(initialState, orderPending)
    ).toEqual({
      ...initialState,
      orderRequestStart: true,
    })
  })

  it('order request success', () => {
    expect(
      reducer(initialState, orderFulfilled)
    ).toEqual({
      ...initialState,
      orderRequestStart: false,
      orderDetails: 'fake'
    })
  })

  it('order request failed', () => {
    expect(
      reducer(initialState, orderRejected)
    ).toEqual({
      ...initialState,
      orderRequestStart: false,
      orderRequestFailed: true,
    })
  })
}) 