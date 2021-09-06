import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  InputLabel,
  FormHelperText,
  FormControl,
  Select,
  NativeSelect,
  Grid,
} from "@material-ui/core";
import {
  selectIsLogged,
  selectDisplayName,
} from "../features/login/loginSlice";
import { storage } from "firebase";
import database from "../db/firebase";
import Header from "../features/header/Header";

export default function Add() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [recipeName, setRecipeName] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [nutrition, setNutrition] = useState("");
  const [imageURL, setImageURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/portfolio-231ae.appspot.com/o/images%2Fno-image.jpg?alt=media&token=c0c48b13-bbc5-4d7d-a563-26818e564ee8"
  );

  const [imageFiles, setImageFiles] = useState(undefined);
  const [notes, setNotes] = useState("");
  const [preperation, setPreperation] = useState("");
  const [cookingInstructions, setCookingInstructions] = useState("");
  const isLogged = useSelector(selectIsLogged);
  const displayName = useSelector(selectDisplayName);

  const handleUploadImage = (image) => {
    const uploadTask = storage().ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // console.log({ snapshot });
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage()
          .ref(`images`)
          .child(`${image.name}`)
          .getDownloadURL()
          .then((url) => {
            setImageURL(url);
          });
      }
    );
  };
  const handleSubmit = () => {
    // Add a new document in recipes collection
    if (
      isLogged &&
      recipeName &&
      recipeName.length > 0 &&
      author &&
      author.length > 0
    )
      database
        .collection("recipes")
        .add({
          name: recipeName,
          author,
          type,
          ingredients,
          nutrition,
          notes,
          preperation,
          cookingInstructions,
          image: imageURL,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
  };

  useEffect(() => {
    if (displayName) setAuthor(displayName);
  }, [displayName]);
  useEffect(() => {
    if (imageFiles) handleUploadImage(imageFiles);
  }, [imageFiles]);

  return (
    <Container>
      <Typography variant="h2">
        Share your recipe with the community.
      </Typography>
      <Header title="Community cookbook" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          history.push("/home");
        }}>
        <Grid container direction="column" justifyContent="center">
          <Grid item>
            <TextField
              id="recipeName"
              name="recipeName"
              label="Recipe name"
              variant="outlined"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
            <TextField
              id="author"
              name="author"
              label="Author"
              variant="outlined"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Grid>
          <Grid item>
            <input
              type="file"
              name="imageFile"
              onChange={(e) => {
                // set image
                setImageFiles(e.target.files[0]);
              }}
            />
          </Grid>
          <Grid item>
            <FormControl
            // className={classes.formControl}
            >
              <InputLabel htmlFor="age-native-helper">Type</InputLabel>
              <NativeSelect
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                inputProps={{
                  name: "Meal type",
                  id: "mealTypeSelect",
                }}>
                <option aria-label="None" value="" />
                <option value={"entree"}>Entrée</option>
                <option value={"appetizer"}>Appetizer</option>
                <option value={"dessert"}>Dessert</option>
                <option value={"drink"}>Drink</option>
              </NativeSelect>
              {/* <FormHelperText>Some important helper text</FormHelperText> */}
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              id="ingredients"
              name="ingredients"
              label="Ingredients"
              variant="outlined"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <TextField
              id="nutrition"
              name="nutrition"
              label="Nutrition"
              variant="outlined"
              value={nutrition}
              onChange={(e) => setNutrition(e.target.value)}
            />

            <TextField
              id="cookingInstructions"
              name="cookingInstructions"
              label="Cooking instructions"
              variant="outlined"
              value={cookingInstructions}
              onChange={(e) => setCookingInstructions(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="preperation"
              name="preperation"
              label="Preperation"
              variant="outlined"
              value={preperation}
              onChange={(e) => setPreperation(e.target.value)}
            />
            <TextField
              id="notes"
              name="notes"
              label="Notes"
              variant="outlined"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          disabled={
            recipeName && recipeName.length > 0 && author && author.length > 0
              ? false
              : true
          }>
          Add recipe
        </Button>
      </form>
    </Container>
  );
}
