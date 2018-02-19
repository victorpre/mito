// @flow
import React, { Component } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import Home from '../Home';
import NotFound from '../../components/NotFound';
import Signup from '../Signup';

type Props = {
  authenticate: () => void,
}

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    }
  }

  props: Props

  render() {
    return (
      <BrowserRouter>
        <div style={{ display: 'flex', flex: '1' }}>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/signup" component={Signup} />
          <Miss component={NotFound} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { authenticate }
)(App);
