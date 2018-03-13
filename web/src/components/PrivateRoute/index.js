// @flow
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

type Props = {
  component: any,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
}

const PrivateRoute = ({
  isAuthenticated,
  willAuthenticate,
  component: Component,
  ...rest
}: Props) =>
  <Route
    { ...rest }
    render={(props) => {
      if (isAuthenticated) { return <Component {...props} />; }
      if (willAuthenticate) { return null; }
      if (!isAuthenticated) { return <Redirect to={{ pathname: '/login' }} />; }
      return null;
    }}
  />;

export default PrivateRoute;
