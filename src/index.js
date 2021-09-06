import React from "react";
import ReactDOM from "react-dom";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import { Login } from "./features";
import { Lister, Recipe, Add, Update } from "./pages";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={App} />
          <Route path="/list" component={Lister} />
          <Route path="/recipe/:id" component={Recipe} />
          <Route path="/add" component={Add} />
          <Route path="/update/:id" component={Update} />
        </Switch>
      </Router>
      <CssBaseline />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
