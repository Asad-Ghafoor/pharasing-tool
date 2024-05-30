import { configureStore } from '@reduxjs/toolkit'
// reducers
import authReducer from "../features/authSlice";

export const myStore = configureStore({
  reducer: {
    auth: authReducer
  },
  // devTools: import.meta.env.MODE === 'development'
})