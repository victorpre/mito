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
  },
  inputLabelFocused: {
    color: pink[300],
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: pink[300],
    },
  },
});

const Input = ({ input, label, type, placeholder, style, meta, classes }: Props) =>
  <FormControl fullWidth className={classes.formControl}>
    <InputLabel
      FormControlClasses={{
        focused: classes.inputLabelFocused,
      }}
      htmlFor={input.name}
    >
      {placeholder}
    </InputLabel>
    <MaterialInput
      {...input}
      classes={{
        inkbar: classes.inputInkbar,
      }}
      id={input.name}
    />
  </FormControl>;


export default (withStyles(styles)(Input));
