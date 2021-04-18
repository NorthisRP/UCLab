import React from "react";
import { BrowserRouter as Switch, Route, Redirect } from "react-router-dom";

import About from "./Pages/About";
import Landing from "./Pages/Landing";
import Blog from "./Pages/Blog";
import Projects from "./Pages/Projects";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";

export const useRoutes = (isAuthentificated) => {
  if (isAuthentificated) {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/blog" component={Blog} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/admin" component={Admin} />
        <Route path="/login">
          <Redirect from="/login" to="/admin" />
        </Route>
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/projects" component={Projects} />
      <Route path="/login" component={Login} />
      <Route path="/admin">
        <Redirect from="/admin" to="/login" />
      </Route>
    </Switch>
  );
};
