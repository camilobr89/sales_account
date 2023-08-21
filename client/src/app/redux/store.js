// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice';
import saleIntentsReducer from './saleIntentsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    saleIntents: saleIntentsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;
