// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Navbar, NavItem, Row, Input} from 'react-materialize'
import { connect } from 'react-redux';
import { logout } from '../../actions/session';

import { withTheme } from 'material-ui/styles'
import { withStyles } from 'material-ui/styles';

import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
import common from 'material-ui/colors/common';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AccountCircle from 'material-ui-icons/AccountCircle';
import ExitToApp from 'material-ui-icons/ExitToApp';
import Icon from 'material-ui/Icon';

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: pink[200],
      main: pink[300],
      dark: pink[400],
      contrastText: common["white"],
    },
    secondary: {
      light: common["white"],
      main: common["white"],
      dark: common["white"],
      contrastText: pink[300],
    },
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

const styles = (theme: Object) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

type Props = {
  logout: () => void,
  currentUser: Object,
  isAuthenticated: boolean,
  classes: Object
}

class MainNavbar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogout = () => this.props.logout(this.context.router);

  render() {
    const { currentUser, isAuthenticated, classes } = this.props;

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <AppBar position="static"color="secondary" >
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Mito
              </Typography>
              {!isAuthenticated &&
                  <Button color="primary" href="/signup" className={classes.button}>
                    Signup
                  </Button>
              }
              {isAuthenticated && (
                  <Button color="primary" className={classes.button}  size="small">
                    <AccountCircle className={classes.leftIcon} />
                    {currentUser.username}
                  </Button>
              )}
              {isAuthenticated && (
                <Button color="primary" className={classes.button} onClick={this.handleLogout} size="small">
                  Signout
                  <ExitToApp className={classes.rightIcon} />
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { logout }
)(withStyles(styles)(MainNavbar));
