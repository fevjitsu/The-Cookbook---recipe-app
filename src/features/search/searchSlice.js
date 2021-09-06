import { createSlice } from "@reduxjs/toolkit";
import database from "../../db/firebase";
export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: [],
    selected: {},
    results: [],
    collection: [],
  },
  reducers: {
    resetValue: (state) => {
      state.searchTerm = [];
      state.selected = {};
      state.results = [];
    },

    setSearchedItem: (state, action) => {
      state.searchTerm = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setCollection: (state, action) => {
      state.collection = action.payload;
    },
  },
});
export const {
  resetValue,
  setSearchedItem,
  setResults,
  setCollection,
  setSelected,
} = searchSlice.actions;
export const setCollectionAsync = (target) => (dispatch) => {
  database
    .ref(`${target}`)
    .once("value")
    .then((snapshot) => {
      const db = [];
      snapshot.forEach(function (item) {
        db.push({ id: item.key, ...item.val() });
      });

      dispatch(setCollection(db));
    })
    .catch((e) => {
      console.log("error fetching");
    });
};

export const selectCollection = (state) => state.search.collection;
export const selectResults = (state) => state.search.results;
export const selectSelectedResult = (state) => state.search.selected;
export default searchSlice.reducer;
