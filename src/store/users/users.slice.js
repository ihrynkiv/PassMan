import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersService} from "../../services/Users.service";

export const fetchUserNames = createAsyncThunk(
  'users/fetchUserNames',
  () => usersService.fetchUserNames()
)

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    userNames: []
  },
  extraReducers: {
    [fetchUserNames.fulfilled]: (state, {payload} ) => {
      state.userNames = payload.data
    },
  }
})
