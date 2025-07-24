import { configureStore } from "@reduxjs/toolkit";
import authReaducer from "./auth-slice/authSlice";

const store = configureStore({
  reducer: {
    auth: authReaducer,
  },
});

export default store;
