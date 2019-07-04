'use strict';
import React, {Component} from 'react';
import _ from 'lodash';
import {Button, ButtonGroup, ButtonToolbar} from 'react-bootstrap';

export default class RadioButtonGroupHelper extends Component {
  constructor(props) {
    super(props);
    this.defaultActiveValueSet = false;
    this.state = {
      buttonList: this.props.buttonList
    }
  }

  handleOnClick = (button, index) => {
    if (this.props.loading) {
      return;
    }
    if (!this.defaultActiveValueSet) {
      this.defaultActiveValueSet = true;
    }
    let cloneButtonList = _.cloneDeep(this.state.buttonList);
    cloneButtonList.map((obj, i) => {
      if (i === index) {
        obj['activeBtn'] = true;
      } else {
        obj['activeBtn'] = false;
      }
    });
    this.setState({
      buttonList: cloneButtonList
    }, () => {
      if (this.props.onButtonClick) {
        this.props.onButtonClick(cloneButtonList[index], index);
      }
    });
  }
  componentWillReceiveProps(newProps) {
    if (newProps && newProps.buttonList) {
      let cloneButtonList = _.cloneDeep(this.state.buttonList);
      this.setState({
        buttonList: _.merge(cloneButtonList, newProps.buttonList)
      });
    }
  }
  render() {
    const {buttonList} = this.state;
    const {activeButtonClass, componentName, btnClassName, btnSize} = this.props;
    const ComponetName = (
      componentName
      ? componentName
      : ButtonToolbar)
    return (<ComponetName {...this.props.componentProps}>
      {
        buttonList.map((button, index) => {
          let isButtonActive = button.activeBtn || (!this.defaultActiveValueSet && button.defaultActive);
          return (<Button key={index} bsStyle={isButtonActive
              ? 'primary'
              : 'default'} className={btnClassName} bsSize={btnSize
              ? btnSize
              : "small"} active={isButtonActive} onClick={() => this.handleOnClick(button, index)}>{button.name}{
              button.icon
                ? <i className={`nicon-${button.icon} nicon-fw`}></i>
                : null
            }
          </Button>)
        })
      }
    </ComponetName>);
  }
}
