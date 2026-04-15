"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const modalSlice = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    modalOpen: (state) => {
      state.value = true;
    },

    modalClose: (state) => {
      state.value = false;
    },
  },
});

export const { modalOpen, modalClose } = modalSlice.actions;

export default modalSlice.reducer;
