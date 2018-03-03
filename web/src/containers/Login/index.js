// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/session';
import LoginForm from '../../components/LoginForm';
import MainNavbar from '../../components/Navbar';

type Props = {
  login: () => void,
}

class Login extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogin = data => this.props.login({user: data}, this.props.history);

  render() {
    return (
      <div >
        <MainNavbar />
        <LoginForm onSubmit={this.handleLogin} />
      </div>
    );
  }
}

export default connect(null, { login })(Login);
