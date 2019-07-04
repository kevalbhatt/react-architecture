'use strict';
import BaseComponent, {LoadingHelper} from 'containers/site/BaseComponent';
import {withRouter, Prompt} from 'react-router';
let isBlocking = false,
  blockingMessage = null;
const setRouterPreventValue = ({isBlocking, message}) => {
  if (_.isBoolean(isBlocking)) {
    isBlocking = isBlocking;
  }
  if (message) {
    blockingMessage = message;
  }

}
const getRouterPreventValue = () => {
  return {isBlocking: isBlocking, message: message};
}
export default class RouterPreventHelper extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isBlocking: false,
      blockingMessage: null
    };
  }
  componentWillMount() {
    this.props.history.listen((location) => {
      let blockingValue = getRouterPreventValue();
      if (blockingValue.isBlocking) {
        this.setState(blockingValue);
      }
    });
  }

  render() {
    const {blockingMessage, isBlocking} = this.state
    return (<Prompt when={isBlocking} message={(location) => {
        return blockingMessage
          ? blockingMessage;
        `Are you sure you want to go to ${location.pathname}`
      }}/>)
  }
}
export {
  setRouterPreventValue,
  getRouterPreventValue
}
