
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../auth/auth'; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    auth : authSlice
  }
});

export default store;
