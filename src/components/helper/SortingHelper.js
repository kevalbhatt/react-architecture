'use strict';
import React, {Component} from 'react';
import _ from 'lodash';
import {ButtonGroup} from 'react-bootstrap';
import ButtonHelper from 'utils/component/ButtonHelper';

export default class SortingHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonList:  _.map(this.props.buttonList,function(o) {
        o['icon'] = o.icon ? o.icon : "sort"
        return o
      })
    }
  }

  handleOnClick = (button, index) => {
    if (this.props.loading) {
      return;
    }
    let cloneButtonList = _.cloneDeep(this.state.buttonList);
    cloneButtonList.map((obj, i) => {
      if (i === index) {
        if (obj.isAscending) {
          obj.isAscending = !obj.isAscending;
        } else {
          obj['isAscending'] = true;
        }
        obj['activeBtn'] = true;
      } else {
        obj['isAscending'] = null;
        obj['icon'] = "sort";
        obj['activeBtn'] = false;
      }
      const type = (
        obj.isAscending === null
        ? "sort"
        : (
          obj.isAscending == true
          ? "arrow-up7"
          : "arrow-down7"));
      obj.icon = type
    });
    this.setState({
      buttonList: cloneButtonList
    }, () => {
      this.props.onButtonClick(cloneButtonList[index], index);
    });
  }

  render() {
    const {activeBtn, buttonList} = this.state;
    return (<ButtonHelper.RadioButtonGroup {...this.props} buttonList={buttonList} onButtonClick={this.handleOnClick}/>)
  }
}
