// @flow
import React, { Component, PropTypes } from 'react';
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
          {isAuthenticated &&
            <NavItem>
              <div>
                <span>{currentUser.username}</span>
                <Button
                  type="button"
                  onClick={this.handleLogout}
                >
                  Logout
                </Button>
              </div>
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

