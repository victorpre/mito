// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
