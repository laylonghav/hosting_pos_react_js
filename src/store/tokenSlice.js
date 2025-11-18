import { createSlice } from "@reduxjs/toolkit";
const initialState = "";
const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, actions) => {
      return actions.payload;
    },
    resetToken: () => {
      return "";
    },
  },
});

export const { setToken, resetToken } = tokenSlice.actions;
export default tokenSlice.reducer;
