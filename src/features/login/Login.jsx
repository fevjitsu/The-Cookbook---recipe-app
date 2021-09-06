import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleOutlined } from "@ant-design/icons";
import { handleLogin, selectIsLogged } from "./loginSlice";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
export default function Login() {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLogged);
  let history = useHistory();

  useEffect(() => {
    if (isLogged) history.push("/home");
  }, [isLogged, history]);
  return (
    <div id="login-page">
      <div id="login-card">
        <br />
        <br />
        <Button
          onClick={() => {
            dispatch(handleLogin());
          }}>
          <GoogleOutlined />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
