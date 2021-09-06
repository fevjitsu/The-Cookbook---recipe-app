import { createSlice } from "@reduxjs/toolkit";
import "firebase/app";
import { auth } from "../../db/firebase";
import firebase from "firebase/app";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogged: false,
    displayName: "",
    email: "",
    photoURL: "",
  },
  reducers: {
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },

    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setPhotoURL: (state, action) => {
      state.photoURL = action.payload;
    },

    setLogged: (state, action) => {
      state.isLogged = action.payload;
    },
  },
});

export const { setLogged, setPhotoURL, setEmail, setDisplayName } =
  loginSlice.actions;

export const handleLogin = () => (dispatch) => {
  auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((userObj) => {
      let { user } = userObj;
      dispatch(setDisplayName(user.displayName));
      dispatch(setEmail(user.email));
      dispatch(setPhotoURL(user.photoURL));
      dispatch(setLogged(true));
    })
    .catch((error) => console.log(error));
};
export const handleLogout = () => (dispatch) => {
  auth.signOut();
  dispatch(setLogged(false));
};
export const selectIsLogged = (state) => state.login.isLogged;

export const selectUser = (state) => state.login.user;
export const selectDisplayName = (state) => state.login.displayName;
export const selectEmail = (state) => state.login.email;
export const selectPhotoURL = (state) => state.login.photoURL;

export default loginSlice.reducer;

// firebase
//             .auth()
//             .signInAnonymously()
//             .then(() => {
//               sessionStorage.setItem("guestLogin", true);
//               // sessionStorage.setItem("bp_user", stringified_user);
//               window.location.href =
//                 "https://my.myshifter.io/shifter-directory/guestshiftpsych-team/#component=dashboard";
//             })
//             .catch((error) => {
//               console.log(error);
//             });
