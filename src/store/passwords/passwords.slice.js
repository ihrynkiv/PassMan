import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {passwordsService} from "../../services/Passwords.service";
import {thunkHandler} from "../thunkHandler";
import {authSlice} from "../auth/auth.slice";

export const fetchPasswords = createAsyncThunk(
  'passwords/fetchPasswords',
  (data, thunkAPI) => thunkHandler(passwordsService.fetchPasswords(), thunkAPI)
)

export const createPassword = createAsyncThunk(
  'passwords/createPassword',
  (data) => passwordsService.createPassword(data)
)

export const passwordsSlice = createSlice({
  name: 'passwords',
  initialState: [],
  extraReducers: {
    [fetchPasswords.fulfilled]: (state, {payload} ) => {
      state = payload.data
    },
    [fetchPasswords.rejected]: (state, {payload} ) => {
      if (payload.status === 401) {
        console.log('here')
        authSlice.actions.setAuth(false)
      }
    },
  }
})
