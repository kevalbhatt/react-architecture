'use strict';
import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import bowser from 'bowser';

export default class DatePickerHelper extends DatePicker {
  constructor(opt) {
    super(opt)
    let oldHandleFocusFn = this.handleFocus;
    this.handleFocus = (e) => {
      if (bowser.mobile && this.props.mobileReadOnly) {
        e.currentTarget.blur();
        this.setOpen(true);
      } else {
        oldHandleFocusFn.call(this, e);
      }
    }
  }

}
