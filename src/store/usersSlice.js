import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Add user
    addUser: (state, actions) => {
      if (!Array.isArray(state)) return [actions.payload];
      state.push(actions.payload);
    },

    // Update user by id
    updateUser: (state, actions) => {
      const { id, data } = actions.payload;
      const index = state.findIndex((user) => user.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...data };
      }
    },

    // Delete user by id
    deteleUser: (state, actions) => {
      return state.filter((user) => user.id !== actions.payload);
    },

    // Clear all
    clearAll: () => initialState,
  },
});

export const { addUser, updateUser, deteleUser, clearAll } = usersSlice.actions;
export default usersSlice.reducer;
