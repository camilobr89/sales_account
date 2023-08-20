// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice';

const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;
