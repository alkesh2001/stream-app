// import { configureStore } from "@reduxjs/toolkit";
// import visibleSlice from './auth/visibleSlice'

// const store = configureStore({
//     reducer : {
//         visiblity : visibleSlice
//     }
// })

// export default store

import { configureStore } from '@reduxjs/toolkit';
import visibleSlice from '../auth/auth'; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    visibility: visibleSlice
  }
});

export default store;
