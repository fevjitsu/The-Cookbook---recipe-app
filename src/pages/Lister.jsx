import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectIsLogged } from "../features/login/loginSlice";
import useStyles from "./styles";
import clsx from "clsx";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
} from "@material-ui/core";

import {
  ExpandMore as ExpandMoreIcon,
  Favorite as FavoriteIcon,
  EmojiFoodBeverage as EmojiFoodBeverageIcon,
  Kitchen as KitchenIcon,
  Edit as EditIcon,
  Fastfood as FastfoodIcon,
  Cake as CakeIcon,
  MoreVert as MoreVertIcon,
} from "@material-ui/icons";
import { getRecipesAsync, selectRecipes } from "../util/recipeSlice";
import Header from "../features/header/Header";

export default function Lister() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLogged);
  const list = useSelector(selectRecipes);
  let history = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const iconGenerator = (type) => {
    switch (type.toLowerCase()) {
      case "dessert":
        return <CakeIcon />;
      case "entree":
        return <KitchenIcon />;
      case "appitizer":
        return <FastfoodIcon />;
      default:
        return <EmojiFoodBeverageIcon />;
    }
  };
  const handleExpand = () => setExpanded(!expanded);
  useEffect(() => {
    dispatch(getRecipesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (!isLogged) history.push("/");
  }, [isLogged, history]);

  useEffect(() => {
    setRecipes(list);
  }, [list]);
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant="h4" gutterBottom>
            Here is a list of community contributed recipes.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Header title="Community recipes" />
        </Grid>
      </Grid>
      <Container>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}>
          {recipes?.map((recipe) => {
            return (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={recipe.id}>
                <Card id={recipe.id} raised>
                  <CardHeader
                    onClick={() => {
                      history.push(`recipe/${recipe.id}`);
                    }}
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {/* &nbsp;{iconGenerator(recipe.type)} */}
                        {/* <br /> */}
                        {recipe.name.charAt(0)}
                      </Avatar>
                    }
                    action={
                      <IconButton
                        // onClick={() => {
                        //   history.push(`recipe/${recipe.id}`);
                        // }}
                        aria-label="more about recipe">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={recipe.name}
                    subheader={recipe.type}
                  />
                  <CardMedia
                    className={classes.media}
                    image={recipe.image}
                    title={recipe.name}
                    style={{ height: "140px" }}
                    onClick={() => {
                      history.push(`recipe/${recipe.id}`);
                    }}
                  />

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p">
                      {" "}
                      {recipe.cookingInstructions}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon color="secondary" />
                    </IconButton>
                    <IconButton aria-label="share">
                      {/* <ShareIcon /> */}
                    </IconButton>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpand}
                      aria-expanded={expanded}
                      aria-label="show more">
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph>{recipe.nutrition}</Typography>
                      <Typography paragraph>{recipe.ingredients}</Typography>
                      <Typography paragraph>{recipe.notes}</Typography>
                      <Typography>{recipe.author}</Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

// import React from 'react';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
// }));

// export default function RecipeReviewCard() {
//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Card className={classes.root}>
//       <CardHeader
//         avatar={
//           <Avatar aria-label="recipe" className={classes.avatar}>
//             R
//           </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title="Shrimp and Chorizo Paella"
//         subheader="September 14, 2016"
//       />
//       <CardMedia
//         className={classes.media}
//         image="/static/images/cards/paella.jpg"
//         title="Paella dish"
//       />
//       <CardContent>
//         <Typography variant="body2" color="textSecondary" component="p">
//           This impressive paella is a perfect party dish and a fun meal to cook together with your
//           guests. Add 1 cup of frozen peas along with the mussels, if you like.
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <IconButton
//           className={clsx(classes.expand, {
//             [classes.expandOpen]: expanded,
//           })}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </IconButton>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <Typography paragraph>Method:</Typography>
//           <Typography paragraph>
//             Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
//             minutes.
//           </Typography>
//           <Typography paragraph>
//             Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
//             heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
//             browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
//             and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
//             pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
//             saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
//           </Typography>
//           <Typography paragraph>
//             Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
//             without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
//             medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
//             again without stirring, until mussels have opened and rice is just tender, 5 to 7
//             minutes more. (Discard any mussels that don’t open.)
//           </Typography>
//           <Typography>
//             Set aside off of the heat to let rest for 10 minutes, and then serve.
//           </Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// }
