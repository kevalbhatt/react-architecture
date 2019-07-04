'use strict';

const checkBoxSwitch = (props) => {
  const { onChange ,checked,name} = props;
  if(!name){ throw new Error("name attributes is reqirend to set id of input field and label")}
  return(<div className="switch">
    <div className="onoffswitch">
      <input type="checkbox" checked={checked} onChange={onChange} className="onoffswitch-checkbox" id={name}/>
      <label className="onoffswitch-label" for={name}>
        <span className="onoffswitch-inner"></span>
        <span className="onoffswitch-switch"></span>
      </label>
    </div>
  </div>)
}

export default checkBoxSwitch;
