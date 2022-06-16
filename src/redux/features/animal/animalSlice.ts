import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IAction } from "../../../models/IAction";
import { IAnimal } from "../../../models/IAnimal";
import { getList, saveList } from "./animalService";

const initialState = {
  value: (getList() as IAnimal[]) || [],
};

export const animalSlice = createSlice({
  name: "animal",
  initialState,
  reducers: {
    saveAnimals: (state, action: IAction<IAnimal[]>) => {
      state.value = action.payload;
      saveList(state.value);
    },
    feed: (state, action: IAction<IAnimal>) => {
      const foundAnimal = state.value.find(
        (animal) => animal.id === action.payload.id
      );
      if (foundAnimal) {
        foundAnimal.isFed = true;
        foundAnimal.lastFed = new Date().toISOString();
        saveList(state.value);
      }
    },
    hungry: (state, action: IAction<IAnimal>) => {
      const foundAnimal = state.value.find(
        (animal) => animal.id === action.payload.id
      );
      if (foundAnimal) {
        foundAnimal.isFed = false;
        saveList(state.value);
      }
    },
  },
});

export const { saveAnimals, feed, hungry } = animalSlice.actions;
export default animalSlice.reducer;
