import { configureStore } from "@reduxjs/toolkit";

import dashboard from "./dashboard";
const store = configureStore({
  reducer: {
    dashboard,
  },
});

export default store;
