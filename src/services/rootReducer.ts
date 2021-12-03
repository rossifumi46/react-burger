import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';
import constructorReducer from './slices/constructorSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import { ordersReducer } from './reducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  builder: constructorReducer,
  order: orderReducer,
  auth: authReducer,
  orders: ordersReducer,
});
