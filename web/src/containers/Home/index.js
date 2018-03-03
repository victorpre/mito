// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainNavbar from '../../components/Navbar';
import Grid from 'material-ui/Grid';

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
      <div style={{ display: 'flex', flex: '1' }}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <MainNavbar />
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default (Home);
