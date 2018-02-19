// @flow
import React, { Component, PropTypes } from 'react';
import MainNavbar from '../../components/Navbar';

type Props = {
  logout: () => void,
  currentUser: Object,
  isAuthenticated: boolean,
}

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  render() {
    return (
      <MainNavbar />
    );
  }
}

export default (Home);
