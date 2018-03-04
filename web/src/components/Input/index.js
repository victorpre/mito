// @flow
import React from 'react';
import MaterialInput, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form'
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

const Input = ({ input, label, type, placeholder, style, meta, classes }: Props) =>
  <FormControl fullWidth className={classes.formControl}>
    <InputLabel
      FormControlClasses={{
        focused: classes.inputLabelFocused,
      }}
      className={
        classes.inputLabel
      }
      htmlFor={input.name}
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
    />
  </FormControl>;


export default (withStyles(styles)(Input));
