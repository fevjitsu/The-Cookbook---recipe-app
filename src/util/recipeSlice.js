import { createSlice } from "@reduxjs/toolkit";
import database from "../db/firebase";

export const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    list: [],
    recipe: {},
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    getRecipeById: (state, action) => {
      state.recipe = state?.list?.find((item) => item.id === action.payload);
    },
    getRecipeByName: (state, action) => {
      state.recipe = state?.list?.find((item) =>
        item.name.includes(action.payload.toLowerCase())
      );
    },
  },
});
export const { setList, getRecipeById, getRecipeByName } = recipeSlice.actions;
export const selectRecipes = (state) => state.recipes.list;
export const selectRecipe = (state) => state.recipes.recipe;
export const getRecipesAsync = () => (dispatch) => {
  database
    .collection("recipes")
    .get()
    .then((snapshot) => {
      let recipes = [];
      snapshot.docs.forEach((doc) => {
        recipes.push({ id: doc.id, ...doc.data() });
      });
      dispatch(setList(recipes));
    });
};

export default recipeSlice.reducer;
