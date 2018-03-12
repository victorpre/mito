// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { withStyles } from 'material-ui/styles';
import withRoot from '../../withRoot';
import { asyncValidate } from '../../actions/validateUserFields';

import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import Input from '../Input';

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

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
  classes: Object,
}

class LoginForm extends Component {
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
        <Grid item xs={12} sm={8} lg={4}>
          <Paper className={classes.root} elevation={8}>
            <Typography variant="headline" component="h2">
              Login
            </Typography>
            <form
              onSubmit={handleSubmit(this.handleSubmit)}
              className={classes.container}
            >
              <Grid item xs={12} sm={12} lg={12}>
                <Field
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Username or e-mail"
                  component={Input}
                  required
                />
                <Field
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  component={Input}
                  required
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
                    {submitting ? 'Submitting...' : 'Login'}
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
  form: 'login',
  validate,
})(withRoot(withStyles(styles)(LoginForm)));;
