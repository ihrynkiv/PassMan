import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AuthService} from "../../services/Auth.service";

export const loginAction = createAsyncThunk(
  'auth/login',
  (data) => AuthService.login(data)
)

export const registrationAction = createAsyncThunk(
  'auth/registration',
  (data) => AuthService.registration(data)
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    isAuth: false
  },
  extraReducers: {
    [loginAction.fulfilled]: (state, action ) => {
      localStorage.setItem('token', action.payload.data)
      state.isAuth = true
      state.username = action.meta.arg.username
    },
    [registrationAction.fulfilled]: (state, action ) => {
      localStorage.setItem('token', action.payload.data)
      state.isAuth = true
      state.username = action.meta.arg.username
    }
  }
})
