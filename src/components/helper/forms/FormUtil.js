import _ from 'lodash';

const Message = ({color, message}) => (<div style={{
    color
  }}>
  <small>{message}</small>
</div>)

const requiredValidate = (value, props) => {
  let val = value && value.trim
    ? value.trim()
    : value;
  return !val || (_.isObject(val) && _.isEmpty(val))
    ? `${props.name
      ? props.name
      : 'This field'} is required`
    : null;
}

const passwordValidate = (password) => {
  var mediumRegex = new RegExp(/^(?=.*[$@$!%*#?&_])|(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,15}$/) //condition: 6 or more characters with a number and an alphabet
  //var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})(?=.*\S+)");
  if (!password) {
    return 'This Field is required.'
  } else if (!mediumRegex.test(password)) {
    return "Password should contain 6 or more characters with atleast an alphabet and a number"
  } else {
    return false
  }
}

const validateReEnteredPassword = (reEnterPasswordNewPassword, props) => {
  let newPassword = props.getValue('newPassword');
  if (!reEnterPasswordNewPassword) {
    return 'This Field is required.'
  } else if (!reEnterPasswordNewPassword || !(reEnterPasswordNewPassword === newPassword)) {
    return 'The password does not match the new password.'
  } else {
    return false;
  }
}

const minLength = (val, props) => {
  let validateObj = props.validate['minLength'];
  if (val && validateObj && validateObj.length) {
    if (val.length < validateObj.length) {
      if (validateObj.message) {
        return validateObj.message
      } else {
        return `${props.name
          ? props.name
          : 'This Field'} requires minimum ${validateObj.length} characters.`
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

const maxLength = (val, props) => {
  let validateObj = props.validate['maxLength'];
  if (val && validateObj && validateObj.length) {
    if (val.length > validateObj.length) {
      if (validateObj.message) {
        return validateObj.message
      } else {
        return `${props.name
          ? props.name
          : 'This Field'} should be upto ${validateObj.length} characters only.`
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}
const stringOnly = (val, props) => {
  var stringOnlyregx = new RegExp(/^[A-Za-z-][A-Za-z- ]+$/) ;
  if (!val) {
    return 'This Field is required.'
  } else if (!stringOnlyregx.test(val)) {
    return `${props.name
      ? props.name
      : 'This Field'} should contain only an alphabet characters`
  } else {
    return false
  }
}

const emailValidation = (val)=>{
  var emailregx = new RegExp(/^([\w-']+(?:\.[\w-']+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i) ;
  if (!val) {
    return 'This Field is required.'
  } else if (!emailregx.test(val)) {
    return `invalid Email Address`
  } else {
    return false
  }
}

const Validate = (val, props) => {
  if (_.isString(props.validate) && _.isFunction(Validate[props.validate])) {
    return Validate[props.validate](val, props);
  } else if (_.isObject(props.validate)) {
    if (_.isArray(props.validate)) {
      let validateSucess = false;
      _.forEach(props.validate, (obj) => {
        let newProps = _.cloneDeep(props);
        let value = Validate(val, _.extend(newProps, {validate: obj}));
        if (value) {
          validateSucess = value;
          return false;
        }
      });
      return validateSucess;
    } else {
      let validateSucess = false;
      _.forEach(_.keys(props.validate), (key) => {
        let newProps = _.cloneDeep(props);
        let tempObj = {};
        tempObj[key] = props.validate[key];
        let value = Validate[key](val, _.extend(newProps, {validate: tempObj}))
        if (value) {
          validateSucess = value;
          return false;
        }
      });
      return validateSucess;
    }
  } else if (_.isFunction(props.validate)) {
    return props.validate(val, props.name)
  }
}

Object.assign(Validate, {
  required: requiredValidate,
  password: passwordValidate,
  reEnteredPassword: validateReEnteredPassword,
  minLength: minLength,
  maxLength: maxLength,
  stringOnly:stringOnly,
  emailValidation:emailValidation
});

export {
  Validate,
  Message
};
