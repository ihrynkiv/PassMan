import {createSelector} from "@reduxjs/toolkit";

const getUsers = (state) => state.users

export const getUserNames = createSelector(
  getUsers,
  (users) => users?.userNames
)