import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false };
const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    setRefresh: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
