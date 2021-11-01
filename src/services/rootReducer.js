import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';
import constructorReducer from './slices/constructorSlice';
import ingredientsReducer from './slices/ingredientsSlice';

const reducer = {
  ingredients: ingredientsReducer,
  builder: constructorReducer,
  order: orderReducer,
  auth: authReducer,
}

export default reducer;