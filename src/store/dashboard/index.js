import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  isSideBarOpen: true,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    setSideBarOpen: (state, action) => {
      state.isSideBarOpen = action.payload;
    },
  },
});

export const { setDarkMode, setSideBarOpen } = dashboardSlice.actions;
export default dashboardSlice.reducer;

// UseSelector'da kolaylık olması açısından!
export const selectDarkMode = (state) => state.dashboard.isDarkMode;
export const selectSidebarOpen = (state) => state.dashboard.isSideBarOpen;
