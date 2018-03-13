// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate, unauthenticate } from '../../actions/session';
import Home from '../Home';
import NotFound from '../../components/NotFound';
import Signup from '../Signup';
import Login from '../Login';

import PublicRoute from '../../components/PublicRoute';
import PrivateRoute from '../../components/PrivateRoute';

type Props = {
  authenticate: () => void,
  unauthenticate: () => void,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
}

class App extends Component {
  componentWillMount(){
    const primaryColor = "#f06292";
      document.body.style.backgroundColor = primaryColor;
  }
  componentWillUnmount(){
      document.body.style.backgroundColor = null;
  }

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  props: Props

  render() {
    const { isAuthenticated, willAuthenticate } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };

    return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} {...authProps}/>
          <PublicRoute path="/signup" component={Signup} {...authProps}/>
          <PublicRoute path="/login" component={Login} {...authProps}/>
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
  }),
  { authenticate, unauthenticate },
)(App);
