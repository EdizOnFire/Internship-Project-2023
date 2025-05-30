import { baseApiMiddleware } from '../utils/baseApiMiddleware';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../utils/baseApi';
import ordersReducer from './ordersSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    orders: ordersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware, baseApiMiddleware),
  devTools: true
})

export default store;