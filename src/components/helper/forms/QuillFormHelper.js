'use strict';
import _ from 'lodash';

import {Field} from "react-form";

import {Message, Validate} from 'utils/component/forms/FormUtil';
import ReactQuill from 'react-quill';

const FormQuill = props => (

// Use the form field and your custom input together to create your very own input!
<Field validate={val => Validate(val, props)} field={props.field} getValue={props.getValue}>
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

      return (<div className={error
          ? 'has-error'
          : ''}>
        <ReactQuill {...rest} value={value || ''} onChange={value => {
            setValue(value)
            if (onChange) {
              onChange(value)
            }
          }}/> {
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
</Field>)

export default FormQuill;
