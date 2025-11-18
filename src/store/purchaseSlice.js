import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    // add purchase
    addPurchase: (state) => {
      if (!Array.isArray(state)) {
        return [
          {
            product_id: "",
            cost: 0,
            qty: 1,
            retail_price: 0,
            ref: "",
            remark: "",
          },
        ];
      }

      state.push({
        product_id: "",
        cost: 0,
        qty: 1,
        retail_price: 0,
        ref: "",
        remark: "",
      });
    },

    // update purchase
    updatePurchase: (state, actions) => {
      const { index, field, value } = actions.payload;
      if (state[index]) {
        state[index][field] = value;
      }
    },

    //remove purchase
    removePurchase: (state, actions) => {
      const index = actions.payload;
      if (index >= 0 && index < state.length) {
        state.splice(index, 1);
      }
    },

    //reset purchase
    resetPurchase: () => initialState,
  },
});

export const { addPurchase, updatePurchase, removePurchase, resetPurchase } =
  purchaseSlice.actions;
export default purchaseSlice.reducer;
