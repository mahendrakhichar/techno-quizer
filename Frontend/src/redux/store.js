import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import adminReducer from './adminSlice'

const store = configureStore({
  reducer: {
    user: userReducer, // User reducer correctly added to the store
    admin:adminReducer,
  },
});

export default store;
