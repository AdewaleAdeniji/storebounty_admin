/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const getUser = () =>
  localStorage.getItem("user_profile_meta")
    ? JSON.parse(localStorage.getItem("user_profile_meta"))
    : null;
export const getToken = () =>
  localStorage.getItem("authT") ? localStorage.getItem("authT") || null : null;

const initialState = {
  email: "",
  loggedin: getToken() !== null,
  token: getToken(),
  password: "",
  user: getUser(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    saveUser: (state, action) => {
      state.user = JSON.parse(action.payload);
      state.loggedin = true;
      state.token = JSON.parse(action.payload).token;
      localStorage.setItem("authT", JSON.parse(action.payload).token);
      localStorage.setItem("user_profile_meta", action.payload);
    },
    saveToken: (state, action) => {
      state.loggedin =  true;
      state.token = action.payload;
      localStorage.setItem("authT", action.payload);
    },
    logoutUser: (state) => {
      userSlice.caseReducers.reset();
      state.token = "";
      state.loggedin = false;
      localStorage.removeItem('authT');
      localStorage.removeItem("user_profile_meta");
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, saveToken, logoutUser, saveUser } = userSlice.actions;

export default userSlice.reducer;