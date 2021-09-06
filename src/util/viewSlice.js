import { createSlice } from "@reduxjs/toolkit";
export const viewSlice = createSlice({
  name: "view",
  initialState: {
    showResultsState: false,
    showCategoriesList: false,
    showAdd: false,
    showAppetizers: false,
    showEntrees: false,
    showDrinks: false,
    showDesserts: false,
    showSelected: false,
  },
  reducers: {
    setShowCategoriesList: (state, action) => {
      state.showCategoriesList = action.payload;
    },
    setShowAdd: (state, action) => {
      state.showAdd = action.payload;
    },
    setShowAppetizers: (state, action) => {
      state.showAppetizers = action.payload;
    },
    setShowEntrees: (state, action) => {
      state.showEntrees = action.payload;
    },
    setShowResultsState: (state, action) => {
      state.showResultsState = action.payload;
    },
    setShowSelected: (state, action) => {
      state.showSelected = action.payload;
    },
    setShowDesserts: (state, action) => {
      state.showDesserts = action.payload;
    },
    setShowDrinks: (state, action) => {
      state.showDrinks = action.payload;
    },
  },
});
export const {
  setShowCategoriesList,
  setShowAdd,
  setShowAppetizers,
  setShowEntrees,
  setShowResultsState,
  setShowSelected,
  setShowDrinks,
  setShowDesserts,
} = viewSlice.actions;
export const selectResultsState = (state) => state.view.showResultsState;
export const selectCategoriesList = (state) => state.view.showCategoriesList;
export const selectAdd = (state) => state.view.showAdd;
export const selectAppetizers = (state) => state.view.showAppetizers;
export const selectEntrees = (state) => state.view.showEntrees;
export const selectDrinks = (state) => state.view.showDrinks;
export const selectDesserts = (state) => state.view.showDesserts;
export const selectSelected = (state) => state.view.showSelected;
export default viewSlice.reducer;
