// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../withRoot';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import Input from '../Input';

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
  classes: Object,
}

const styles = theme => ({
  root: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      marginTop: theme.spacing.unit * 3,
  }),
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});


class SignupForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  state = {
    direction: 'row',
    justify: 'center',
    alignItems: 'center',
  };

  render() {
    const { handleSubmit, submitting, classes } = this.props;
    const { alignItems, direction, justify } = this.state;

    return (
      <Grid container
        alignItems={alignItems}
        direction={direction}
        justify={justify}
        style={{flexGrow: 1}}
      >
        <Grid item xs={11} sm={8} lg={4}>
          <Paper className={classes.root} elevation={8}>
            <Typography variant="headline" component="h1">
              Create a new account
            </Typography>

            <form
              onSubmit={handleSubmit(this.handleSubmit)}
              className={classes.container}
            >
              <Grid item xs={12} sm={12} lg={12}>

                <Field
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Full name"
                  component={Input}
                />
                <Field
                  label="Username"
                  placeholder="Username"
                  name="username"
                  type="text"
                  component={Input}
                />
                <Field
                  label="Email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  component={Input}
                />
                <Field
                  label="Password"
                  name="password"
                  placeholder="Password"
                  type="password"
                  component={Input}
                />
              </Grid>
              <Grid container
                justify='flex-end'
              >
                <Grid item>
                  <Button
                    variant="raised"
                    color="primary"
                    disabled={submitting}
                    type="submit"
                  >
                    {submitting ? 'Submitting...' : 'Sign up'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
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
})(withRoot(withStyles(styles)(SignupForm)));
