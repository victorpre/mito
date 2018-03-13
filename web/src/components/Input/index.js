// @flow
import React from 'react';
import MaterialInput, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText} from 'material-ui/Form'

import { withStyles } from 'material-ui/styles';
import pink from 'material-ui/colors/pink';
import lime from 'material-ui/colors/lime';

type Props = {
  input: Object,
  label?: string,
  type?: string,
  placeholder?: string,
  style?: Object,
  meta: Object,
  classes: Object,
  required?: Boolean,
  asyncValidateable: Boolean,
}

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    alignItems: 'center',
  },
  labelAlign: {
    marginLeft: "15%"
  },
  helperAlign: {
    marginLeft: "15%",
    alignSelf: "left",
  },
  inputLabelFocused: {
    color: pink[300],
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: pink[300],
    },
  },
  inputWidth: {
    width: "70%"
  },
  textHelperSuccess: {
    color: lime["A700"]
  }
});

const Input = ({ input, label, type, placeholder, style, meta: {touched, error, valid}, classes, required, asyncValidateable }: Props) =>
  <FormControl fullWidth className={classes.formControl} required={required}>
    <InputLabel
      FormControlClasses={{
        focused: classes.inputLabelFocused,
      }}
      className={
        classes.labelAlign
      }
      htmlFor={input.name}
      error={(touched && error) ? true : false}
    >
      {placeholder}
    </InputLabel>
    <MaterialInput
      {...input}
      type={type}
      classes={{
        input: classes.inputInkbar,
      }}
      className={classes.inputWidth}
      id={input.name}
      error={(touched && error) ? true : false}
    />
    {touched && error &&
        <FormHelperText error className={classes.helperAlign}>{error}</FormHelperText>
    }
    {touched && valid && asyncValidateable &&
        <FormHelperText
          classes={{root: classes.textHelperSuccess}}
          className={classes.helperAlign}
        >
          {input.name} is available!
        </FormHelperText>
    }
  </FormControl>;


export default (withStyles(styles)(Input));
