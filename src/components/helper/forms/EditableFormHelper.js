'use strict';
import React, {Component} from 'react';
import _ from 'lodash';

import {Field} from "react-form";
import Editable from 'utils/libs/react-x-editable/js/Editable';

import {Message, Validate} from 'utils/component/forms/FormUtil';

const FormEditable = props => (<Field validate={val => Validate(val, props)} field={props.field}>
  {
    fieldApi => {

      // Remember to pull off everything you dont want ending up on the <input>
      // thats why we pull off onChange, onBlur, and field
      // Note, the ...rest is important because it allows you to pass any
      // additional fields to the internal <input>.
      const {
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

      const editableProps = {
        emptyValueText: "-",
        name: "note",
        mode: "popup",
        placement: "top",
        showButtons: true,
        buttons: {
          okProps: {
            bsStyle: "primary"
          },
          cancelProps: {
            bsStyle: "danger"
          }
        },
        handleSubmit: (scope) => {
          setValue(scope.value)
        },
        validate: (val) => {
          return !val || val.trim() === ''
            ? 'Note cannot be blank'
            : null;
        },
        onCancel: (editableThis) => {}
      };
      if (props.dataType == "textarea") {
        editableProps["controlProps"] = {
          style: {
            height: "120px"
          }
        }
      }
      return (<Editable {...editableProps} {...props} value={value || ''}/>)
    }
  }
</Field>);

export default FormEditable;
