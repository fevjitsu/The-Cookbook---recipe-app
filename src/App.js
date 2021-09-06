import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Button } from "@material-ui/core";
import Main from "./pages/Main";
import { makeStyles } from "@material-ui/core/styles";
import {
  handleLogout,
  selectDisplayName,
  selectIsLogged,
} from "./features/login/loginSlice";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  main: {
    height: "100vh",
  },
  mainImage: {
    width: "100%",
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const displayName = useSelector(selectDisplayName);
  const isLogged = useSelector(selectIsLogged);
  let history = useHistory();
  useEffect(() => {
    if (!isLogged) history.push("/");
  }, [isLogged, history]);
  return (
    <Container className={classes.root}>
      <Grid container direction={"row"} justifyContent={"flex-end"}>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              dispatch(handleLogout());
            }}>
            Log out
          </Button>
        </Grid>
      </Grid>
      <Grid container direction={"row"} justifyContent={"center"}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Main displayName={displayName} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
