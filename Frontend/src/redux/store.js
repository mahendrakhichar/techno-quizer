import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer, // User reducer correctly added to the store
  },
});

export default store;
