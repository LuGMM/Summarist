"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const logInSlice = createSlice({
  name: "isSignedIn",
  initialState,
  reducers: {
    signedIn: (state) => {
      state.value = true;
    },

    signedOut: (state) => {
      state.value = false;
    },
  },
});

export const { signedIn, signedOut } = logInSlice.actions;

export default logInSlice.reducer;
