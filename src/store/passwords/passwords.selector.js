import {createSelector} from "@reduxjs/toolkit";

const getAll = (state) => state.passwords

export const getPasswords = createSelector(
  getAll,
  (passwords) => passwords?.data || []
)

export const getPasswordById = createSelector(
  getPasswords,
  (_, id) => id,
  (passwords, id) => passwords.find((password) => password.id === +id) || {}
)