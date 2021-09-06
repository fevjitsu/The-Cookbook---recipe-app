import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import {
  setList,
  getRecipeByName,
  selectRecipes,
  selectRecipe,
} from "../../util/recipeSlice";
import { useHistory } from "react-router-dom";
export default function Header({
  title = "Header title",
  searchBtnName = "search",
  hasSearch = false,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const recipe = useSelector(selectRecipe);
  let history = useHistory();
  useEffect(() => {
    // dispatch(setList())
    if (searchTerm.length > 0) dispatch(getRecipeByName(searchTerm));
  }, [dispatch, searchTerm, recipe]);
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.title}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push("/home")}>
              Home
            </Button>
            &nbsp;
            {title}
          </Typography>
          <Box display="flex">
            {hasSearch && (
              <React.Fragment>
                <Typography variant="h6" className={classes.title}>
                  {searchBtnName}
                </Typography>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    name="searchInput"
                    placeholder="search..."
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                </div>
              </React.Fragment>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <br />
    </React.Fragment>
  );
}
