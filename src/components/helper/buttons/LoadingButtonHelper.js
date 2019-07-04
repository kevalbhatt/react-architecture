import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import LoadingHelper from 'utils/component/LoadingHelper';
import _ from 'lodash';

export default class LoadingButtonHelper extends Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    const {loading, title, loadingComponent, children} = this.props;
    let propsOmit = ['loading'],
      disabled = false;
    if (loading) {
      propsOmit.push('disabled');
    }
    if (loading) {
      disabled = loading;
    } else if (!loading && !_.isUndefinedOrNull(this.props.disabled)) {
      disabled = this.props.disabled;
    }
    return (<Button bsStyle="primary" disabled={disabled} {..._.omit(this.props,propsOmit)}>
      {
        loading
          ? loadingComponent || [
            <i key="1" className="nicon-spinner9 nicon-fw pulse m-r-xs"></i>,
            children
          ]
          : children
      }
    </Button>);
  }
}
