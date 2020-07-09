import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Header from "Components/Header";
import Movie from "Routes/Movie";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Detail from "Routes/Detail";
import People from "Routes/People";
import "./Router.css";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/nomflix/" exact component={Movie} />
        <Route path="/nomflix/tv" component={TV} />
        <Route path="/nomflix/people" component={Search} />
        <Route path="/nomflix/search" component={Search} />
        <Route path="/nomflix/movie/:id" component={Detail} />
        <Route path=" /nomflix/show/:id" component={Detail} />
        <Route path="/nomflix/people_Detail/:id" component={People} />
        <Redirect from="*" to="/nomflix/" />
      </Switch>
    </>
  </Router>
);
