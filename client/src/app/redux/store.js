// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice';
import saleIntentsReducer from './saleIntentsSlice';
import userDetailsSlice from './userDetailsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    saleIntents: saleIntentsReducer,
    userDetails: userDetailsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;
