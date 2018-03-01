// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Navbar, NavItem, Row, Input} from 'react-materialize'
import { connect } from 'react-redux';
import { logout } from '../../actions/session';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../withRoot';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AccountCircle from 'material-ui-icons/AccountCircle';
import ExitToApp from 'material-ui-icons/ExitToApp';
import Icon from 'material-ui/Icon';


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
)(withRoot(withStyles(styles)(MainNavbar)));
