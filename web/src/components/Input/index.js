// @flow
import React from 'react';
import MaterialInput, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText} from 'material-ui/Form'

import { withStyles } from 'material-ui/styles';
import pink from 'material-ui/colors/pink';

type Props = {
  input: Object,
  label?: string,
  type?: string,
  placeholder?: string,
  style?: Object,
  meta: Object,
  classes: Object,
  required?: Boolean,
}

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    alignItems: 'center',
  },
  inputLabel: {
    left: "15%"
  },
  inputLabelFocused: {
    color: pink[300],
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: pink[300],
    },
  },
  size: {
    width: "70%"
  },
});

const Input = ({ input, label, type, placeholder, style, meta: {touched, error}, classes, required }: Props) =>
  <FormControl fullWidth className={classes.formControl} required={required}>
    <InputLabel
      FormControlClasses={{
        focused: classes.inputLabelFocused,
      }}
      className={
        classes.inputLabel
      }
      htmlFor={input.name}
      error={touched && error}
    >
      {placeholder}
    </InputLabel>
    <MaterialInput
      {...input}
      type={type}
      classes={{
        inkbar: classes.inputInkbar,
      }}
      className={classes.size}
      id={input.name}
      error={touched && error}
    />
    {touched && error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>;


export default (withStyles(styles)(Input));
