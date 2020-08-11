import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Header from "Components/Header";
import Search from "Routes/Search";
import useHome from "Routes/Home";
import useTV from "Routes/TV";
import useDetail from "Routes/Detail";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/" exact component={useHome} />
        <Route path="/tv" component={useTV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={useDetail} />
        <Route path="/show/:id" component={useDetail} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
