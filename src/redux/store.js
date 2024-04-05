import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./TaskSlice.js";

export default configureStore({
  reducer: {
    task: taskReducer,
  },
});
