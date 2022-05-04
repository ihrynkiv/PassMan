import { configureStore } from '@reduxjs/toolkit'
import {authSlice} from "./auth/auth.slice";
import {usersSlice} from "./users/users.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    users: usersSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})