import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { socketMiddleware } from "./middleware/socket-middleware";
import { rootReducer } from './rootReducer';

import { 
  connect as OrdersWsConnect, 
  disconnect as OrdersWsDisconnect,
  wsConnecting as OrdersWsConnecting,
  wsOpen as OrdersWsOpen,
  wsClose as OrdersWsClose,
  wsMessage as OrdersWsNessage,
  wsError as OrdersWsError 
} from "./actions";

const wsActions = {
  wsConnect: OrdersWsConnect,
  wsDisconnect: OrdersWsDisconnect,
  wsConnecting: OrdersWsConnecting,
  onOpen: OrdersWsOpen,
  onClose: OrdersWsClose,
  onError: OrdersWsError,
  onMessage: OrdersWsNessage,
};

const ordersMiddleware = socketMiddleware(wsActions);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ordersMiddleware),
  devTools: process.env.NODE_ENV !== "production",
  // preloadedState,
  // enhancers: [customEnhancer],
});

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useDispatch = () => dispatchHook<AppDispatch>() // Export a hook that can be reused to resolve types
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
