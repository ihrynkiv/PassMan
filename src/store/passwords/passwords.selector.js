import {createSelector} from "@reduxjs/toolkit";

const getAll = (state) => state.passwords

export const getPasswords = createSelector(
  getAll,
  (passwords) => passwords?.data || []
)