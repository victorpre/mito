// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Navbar, NavItem, Row, Input, Button} from 'react-materialize'
import { connect } from 'react-redux';
import { logout } from '../../actions/session';

type Props = {
  logout: () => void,
  currentUser: Object,
  isAuthenticated: boolean,
}

class MainNavbar extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogout = () => this.props.logout(this.context.router);

  render() {
    const { currentUser, isAuthenticated } = this.props;

    return (
      <Navbar brand='Mito' right>
        {!isAuthenticated && <NavItem href="/signup">Signup</NavItem> }
        {isAuthenticated && <NavItem>{currentUser.username}</NavItem> }
        {isAuthenticated &&
          <NavItem onClick={this.handleLogout}>
            <i className="material-icons right">
              exit_to_app
            </i>
            Logout
          </NavItem>
        }
      </Navbar>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    currentUser: state.session.currentUser,
  }),
  { logout }
)(MainNavbar);

