import React from "react";
import config from "../../config/router";
import { Switch, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";

function PrivateRoute(props) {
  const role = props.role || "guest";

  const allowedComponent = config[role];

  // console.log(allowedComponent);

  return (
    <Switch>
      {allowedComponent.map((route) => (
        <Route exact path={route.url} key={route.url}>
          <route.page setRole={props.setRole}></route.page>
        </Route>
      ))}
      <Route component={NotFound}></Route>
    </Switch>
  );
}

export default PrivateRoute;
