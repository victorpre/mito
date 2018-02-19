// @flow
import React from 'react';

type Props = {
  input: Object,
  label?: string,
  type?: string,
  placeholder?: string,
  style?: Object,
  meta: Object,
}

const Input = ({ input, label, type, placeholder, style, meta }: Props) =>
  <div className="input-field">
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="validate"
      id={input.name}
    />
      {label && <label htmlFor={input.id}>{label}</label>}
      {meta.touched && meta.error &&
        <div style={{ fontSize: '85%', color: 'rgb(255,59,48)' }}>{meta.error}</div>
      }
  </div>;


export default Input;
