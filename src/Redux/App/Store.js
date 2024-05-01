import { configureStore } from "@reduxjs/toolkit";
import FurnitureReducer from "../Features/FurnitureSlice";
import CardReducer from "../Features/CartSlice";

export const store = configureStore({
  reducer: {
    Furnitures: FurnitureReducer,
    CartState: CardReducer,
  },
});
