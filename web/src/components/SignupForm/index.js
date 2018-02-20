// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Card, Col, Row, Button} from 'react-materialize'
import Input from '../Input';

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
}

class SignupForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <Row>
        <Col className="xl4" l={8} m={12} s={12} offset="l2 xl4">
          <Card title='Create a new account'>
            <form
              onSubmit={handleSubmit(this.handleSubmit)}
            >
              <Row>
                <Field
                  label="Full Name"
                  name="name"
                  type="text"
                  component={Input}
                />
              </Row>
              <Row>
                <Field
                  label="Username"
                  name="username"
                  type="text"
                  component={Input}
                />
              </Row>
              <Row>
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  component={Input}
                />
              </Row>
              <Row>
                <Field
                  name="password"
                  label="Password"
                  type="password"
                  component={Input}
                />
              </Row>
              <Row className="right-align">
                  <Button
                    waves="light"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Sign up'}
                  </Button>
              </Row>
              <hr style={{ margin: '2rem 0' }} />
              <Row
                className="center-align"
              >
                  <Button
                    node='a'
                    href='/login'
                    waves="light"
                    className="btn-large"
                  >
                    Login
                  </Button>
              </Row>
            </form>
          </Card>
        </Col>
      </Row>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum of 6 characters';
  }
  return errors;
};

export default reduxForm({
  form: 'signup',
  validate,
})(SignupForm);
