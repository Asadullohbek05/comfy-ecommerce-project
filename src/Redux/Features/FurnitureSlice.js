import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("mode") || "light",
  userData: localStorage.getItem("userData"),
};

document.documentElement.setAttribute("data-theme", initialState.mode);

const Furnitures = createSlice({
  name: "Furnitures",
  initialState,
  reducers: {
    ChangeMode: (state) => {
      state.mode = state.mode === "dracula" ? "light" : "dracula";
      localStorage.setItem("mode", state.mode);
      document.documentElement.setAttribute("data-theme", state.mode);
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
    },
  },
});

export const { ChangeMode, setUserData } = Furnitures.actions;

export default Furnitures.reducer;
