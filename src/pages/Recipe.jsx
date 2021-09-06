import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  getRecipeById,
  getRecipeByName,
  selectRecipe,
} from "../util/recipeSlice";
import { selectIsLogged } from "../features/login/loginSlice";
import {
  CircularProgress,
  Grid,
  Typography,
  Paper,
  Button,
  Chip,
  Container,
} from "@material-ui/core";
import Header from "../features/header/Header";
export default function Recipe() {
  const { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const recipe = useSelector(selectRecipe);
  const RecipeContent = ({ recipe }) => {
    const dispatch = useDispatch();
    const isLogged = useSelector(selectIsLogged);
    useEffect(() => {
      if (!isLogged) history.push("/");
    }, [isLogged]);
    return (
      <Container>
        <Grid container id={recipe.id} spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="h2">{recipe.name}</Typography>
            <Header title="Community cookbook" />
            <Typography variant="h5">{recipe.author}</Typography>

            <Chip label={recipe.type} onClick={() => console.log("clicked")} />

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}>
              <Grid item>
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  style={{ height: "140px" }}
                />
              </Grid>
              <Grid item>
                <Grid container direction="column" alignItems="flex-start">
                  <Grid item>
                    <Typography>{recipe.ingredients}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{recipe.cookingInsturctions}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{recipe.preperation}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{recipe.nutrition}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{recipe.notes}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  };
  useEffect(() => {
    if (id) dispatch(getRecipeById(id));
  }, [id, dispatch]);

  return (
    <div>
      {recipe ? <RecipeContent recipe={recipe} /> : <CircularProgress />}
    </div>
  );
}
