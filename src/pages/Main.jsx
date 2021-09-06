import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import useStyles from "./styles";

export default function Main({ displayName = "there" }) {
  const classes = useStyles();
  let history = useHistory();
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.main}>
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <Typography variant="h2">Community Cookbook</Typography>
        <Typography variant="h4">
          Hi {displayName},share your recipes with the community around you.
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={4}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => history.push("/list")}>
              List
            </Button>
            &nbsp;
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => history.push("/add")}>
              Add your own
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Typography variant="h1">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/portfolio-231ae.appspot.com/o/images%2Ffood-thumbnail.jpg?alt=media&token=91674107-8adf-4bad-8d69-0931268c58cb"
            }
            alt="food tray with tomatoes, salad"
            className={classes.mainImage}
          />
        </Typography>
      </Grid>
    </Grid>
  );
}
