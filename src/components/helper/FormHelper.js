import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import _ from 'lodash';

import Select from 'utils/component/forms/SelectFormHelper';
import Editable from 'utils/component/forms/EditableFormHelper';
import Text from 'utils/component/forms/TextFormHelper';
import TextArea from 'utils/component/forms/TextAreaFormHelper';
import DatePicker from 'utils/component/forms/DatePickerFormHelper';
import Quill from 'utils/component/forms/QuillFormHelper';

const FormHelper = {};

Object.assign(FormHelper, {
  Select,
  Editable,
  Text,
  TextArea,
  DatePicker,
  Quill
});

export default FormHelper;
