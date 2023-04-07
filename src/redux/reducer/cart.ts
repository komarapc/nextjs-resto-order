import { CartProps } from "@/interface/cart";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartProps[] = [];
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: { type: string; payload: CartProps }) => {
      state.push(action.payload);
    },
    remove: (state, action: { type: string; payload: string }) => {
      state = state.filter((cart) => cart.id !== action.payload);
      return state;
    },
    clearAll: (state) => {
      // set state to empty array
      console.log("clearAll");
      state = [];
      return state;
    },
  },
});

export const { add, remove, clearAll } = cartSlice.actions;
export default cartSlice.reducer;
