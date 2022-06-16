import { configureStore } from "@reduxjs/toolkit";
import animalSlice from "./features/animal/animalSlice";

export default configureStore({
  reducer: {
    animals: animalSlice,
  },
});
