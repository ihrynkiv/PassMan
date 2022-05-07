import {createSelector} from "@reduxjs/toolkit";

const getAuth = (state) => state.auth

export const getCurrentUsername = createSelector(
  getAuth,
  (auth) => auth?.username
)