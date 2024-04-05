import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isSigned: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsSigned(state, action) {
      state.isSigned = action.payload;
    },
  },
});

export const { setUser, setIsSigned } = taskSlice.actions;
export default taskSlice.reducer;
