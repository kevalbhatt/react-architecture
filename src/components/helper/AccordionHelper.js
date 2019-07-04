'use strict';
import React, {Component} from 'react';
import {Modal, Button, Panel} from 'react-bootstrap';

export default class AccordionHelper extends Component {
  constructor(poprs) {
    super(poprs);
    this.state = {
      open: _.isUndefined(this.props.defaultExpanded)
        ? true
        : this.props.defaultExpanded
    }
  }

  render() {
    const {id, title, children, defaultExpanded, tools} = this.props;
    const {open} = this.state;
    let titleClasses = ["ibox-title", this.props.panelHeaderClasses || ""].join(" ");
    return (<Panel id={id} defaultExpanded={open || true} className="ibox" expanded={open} onToggle={() => {}}>
      <Panel.Heading className={titleClasses}>
        <Panel.Title componentClass="h5">
          {title}
        </Panel.Title>
        <a onClick={() => this.setState({
            open: !open
          })}>
          <div className="ibox-tools">
            {
              tools
                ? tools
                : null
            }
              <i className={`${open
                  ? "nicon-arrow-up2"
                  : "nicon-arrow-down2"}`}></i>
          </div>
        </a>
      </Panel.Heading>
      <Panel.Collapse>
        <Panel.Body className="ibox-content">
          {children}
        </Panel.Body>
      </Panel.Collapse>
    </Panel>)
  }
}
