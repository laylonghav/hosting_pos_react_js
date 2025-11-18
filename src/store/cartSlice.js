import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to cart
    addToCart: (state, actions) => {
      const item = actions.payload;
      const existing = state.find((i) => i.id === item.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.push({ ...item, qty: 1 });
      }
    },

    // Descrement cart
    descrementCart: (state, actions) => {
      const item = actions.payload;
      const existing = state.find((i) => i.id === item.id);
      if (existing) {
        if (existing.qty > 1) {
          existing.qty -= 1;
        } else {
          return state.filter((i) => i.id !== item.id);
        }
      }
    },

    //Clear item cart
    clearItemCart: (state, actions) => {
      const item = actions.payload;
      return state.filter((i) => i.id !== item.id);
    },

    //Clear All
    clearAllItem: () => initialState,
  },
});

export const { addToCart, descrementCart, clearItemCart, clearAllItem } =
  cartSlice.actions;
export default cartSlice.reducer;
