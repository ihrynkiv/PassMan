import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {passwordsService} from "../../services/Passwords.service";
import {thunkHandler} from "../thunkHandler";

export const fetchPasswords = createAsyncThunk(
  'passwords/fetchPasswords',
  (data, thunkAPI) => thunkHandler(passwordsService.fetchPasswords(), thunkAPI)
)

export const createPassword = createAsyncThunk(
  'passwords/createPassword',
  (data, thunkAPI) => thunkHandler(passwordsService.createPassword(data), thunkAPI)
)

export const passwordsSlice = createSlice({
  name: 'passwords',
  initialState: {
    data: []
  },
  extraReducers: {
    [fetchPasswords.fulfilled]: (state, {payload} ) => {
      console.log('payload = ', payload)
      state.data = payload.data
    },
  }
})
