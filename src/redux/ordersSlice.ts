import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "types/types";

const initialState: { orders: IProduct[] } = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IProduct[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<IProduct>) => {
      state.orders.push(action.payload);
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
  },
});

export const { setOrders, addOrder, removeOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
