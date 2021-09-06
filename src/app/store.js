import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import loginReducer from "../features/login/loginSlice";
import recipeReducer from "../util/recipeSlice";
import searchReducer from "../features/search/searchSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    recipes: recipeReducer,
    search: searchReducer,
  },
});
