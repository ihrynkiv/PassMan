import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {passwordsService} from "../../services/Passwords.service";
import {thunkHandler} from "../thunkHandler";
import {getDecryptedPassword} from "../../utils/passwords.utils";

export const fetchPasswords = createAsyncThunk(
  'passwords/fetchPasswords',
  (data, thunkAPI) => thunkHandler(passwordsService.fetchPasswords(), thunkAPI)
)

export const createPassword = createAsyncThunk(
  'passwords/createPassword',
  (data, thunkAPI) => thunkHandler(passwordsService.createPassword(data), thunkAPI)
)

export const updatePassword = createAsyncThunk(
  'passwords/updatePassword',
  ({data, id}, thunkAPI) => thunkHandler(passwordsService.updatePassword(id, data), thunkAPI)
)

export const deletePassword = createAsyncThunk(
  'passwords/deletePassword',
  ({id}, thunkAPI) => thunkHandler(passwordsService.deletePassword(id), thunkAPI)
)


export const passwordsSlice = createSlice({
  name: 'passwords',
  initialState: {
    data: []
  },
  extraReducers: {
    [fetchPasswords.fulfilled]: (state, {payload} ) => {
      state.data = payload.data.map(passwordEntity => {
        const encryptedPassword = getDecryptedPassword(passwordEntity.password)
        return {...passwordEntity, password: encryptedPassword}
      })
    },
  }
})
