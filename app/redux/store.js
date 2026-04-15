import { configureStore } from "@reduxjs/toolkit";
import isSignedIn from "../redux/logInSlice";
import modal from "../redux/signInModalSlice";

export const store = configureStore({
  reducer: {
    isSignedIn: isSignedIn,
    modal: modal,
  },
});
