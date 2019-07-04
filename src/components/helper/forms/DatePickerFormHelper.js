'use strict';
import _ from 'lodash';

import {Field} from "react-form";

import {Message, Validate} from 'utils/component/forms/FormUtil';
import DatePickerHelper from 'utils/component/DatePickerHelper';
import moment from 'moment';
import bowser from 'bowser';

const FormDatePicker = props => (

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
        toNoTimeJSON,
        onBlur,
        field,
        ...otherProps
      } = props

      let {
        selectsStart,
        selectsEnd,
        ...rest
      } = otherProps;

      const {
        value,
        error,
        warning,
        success,
        setValue,
        setTouched
      } = fieldApi
      let selectedDate = _.isString(value)
        ? (
          toNoTimeJSON
          ? moment(value, 'YYYY-MM-DD')
          : moment(value))
        : value
      if (selectsStart && (_.isNull(value) || _.isUndefined(value))) {
        selectsStart = false;
      }
      if (selectsEnd && (_.isNull(value) || _.isUndefined(value))) {
        selectsEnd = false;
      }
      return (<div className={error
          ? 'has-error'
          : ''}>
        <DatePickerHelper {...rest} selectsStart={selectsStart} selectsEnd={selectsEnd} selected={selectedDate} onChange={date => {
            setValue(date);
            if (onChange) {
              onChange(date, fieldApi);
            }
          }} withPortal={bowser.mobile || bowser.tablet} mobileReadOnly={true}/> {
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

export default FormDatePicker;
