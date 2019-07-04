'use strict';
import React, {Component} from 'react';
import _ from 'lodash';

import {Field} from "react-form";
import Select from 'react-select';

import {Message, Validate} from 'utils/component/forms/FormUtil';

const FormSelect = props => (<Field validate={val => Validate(val, props)} field={props.field}>
  {
    fieldApi => {

      // Remember to pull off everything you dont want ending up on the <input>
      // thats why we pull off onChange, onBlur, and field
      // Note, the ...rest is important because it allows you to pass any
      // additional fields to the internal <input>.
      const {
        onChange,
        onBlur,
        field,
        ...rest
      } = props

      const {
        value,
        error,
        warning,
        success,
        setValue,
        setTouched
      } = fieldApi

      let Component = null;
      if (props.loadOptions) {
        Component = props.tag
          ? Select.AsyncCreatable
          : Select.Async;
      } else {
        Component = props.tag
          ? Select.Creatable
          : Select;
      }

      return (<div className={error
          ? 'has-error'
          : ''}>
        <Component {...rest} value={value || ''} onChange={value => {
            setValue(value)
            props.modifyValue ? setValue(props.modifyValue(value)) : setValue(value)
            if (onChange) {
              onChange(value)
            }
          }} onBlur={e => {
            setTouched()
            if (onBlur) {
              onBlur(e)
            }
          }}/>
          {
          error
            ? <Message color="red" message={error}/>
            : null
        }
        {
          !error && warning
            ? <Message color="orange" message={warning}/>
            : null
        }
        {
          !error && !warning && success
            ? <Message color="green" message={success}/>
            : null
        }
      </div>)
    }
  }
</Field>);

export default FormSelect;
