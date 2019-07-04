'use strict';
import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

export default class ModalHelper extends Component {
  constructor(poprs) {
    super(poprs);
    this.buttonOption = {
      okText: "Ok",
      closeText: "Close",
      okButton: true,
      closeButton: true,
      onClose: () => this.close(),
      onOk: () => this.close()
    }
    this.state = {
      showModal: this.props.show || false,
      preventModalClose: this.props.preventModalClose || false
    };
  }
  preventModalClose = (mode) => {
    this.setState({preventModalClose: mode});
  }
  close = () => {
    if (this.props.beforeClose) {
      this.props.beforeClose();
    }
    if (!this.state.preventModalClose) {
      this.setState({showModal: false});
      if (this.props.onClose) {
        this.props.onClose();
      }
      if (this.props.afterClose) {
        this.props.afterClose();
      }
    } else {
      if (this.props.afterPrevented) {
        this.props.afterPrevented();
      }
    }

  }
  open = (options) => {
    if (this.props.beforeOpen) {
      this.props.beforeOpen();
    }
    this.setState({showModal: true});
    if (this.props.onOpen) {
      this.props.onOpen();
    }
    if (this.props.afterOpen) {
      this.props.afterOpen();
    }

  }
  componentWillReceiveProps(nextProps) {
    if (!_.isUndefined(nextProps && nextProps.show)) {
      if (nextProps.show == true) {
        this.setState({showModal: true});
      } else if (nextProps.show == false) {
        this.setState({showModal: false});
      }
    }
  }
  render() {
    const {
      title,
      children,
      bsSize,
      buttons,
      backdrop,
      previewBox,
      className,
      bsClass,
      visiblity,
      footer,
      header,
      docView,
      buttonOption,
      crossButton,
      headerClass,
      okBtnBsStyle,
      cancelBtnBsStyle,
      noFooter
    } = this.props;
    _.extend(this.buttonOption, buttonOption);
    const {
      okText,
      closeText,
      onOk,
      onClose,
      okButton,
      closeButton
    } = this.buttonOption;
    return (<Modal keyboard={false} animation={false} backdropTransition={false} className={docView
        ? "doc-view " + className
        : className} bsClass={bsClass || (
        previewBox
        ? "modal-preview"
        : bsClass)} backdrop={backdrop || 'static'} show={this.state.showModal} bsSize={bsSize || "large"} onHide={this.close} data-qa="qa-modal">
      {

        !previewBox
          ? <Modal.Header className={headerClass} closeButton={crossButton
                ? crossButton
                : false}>
              {
                title && _.isFunction(title)
                  ? title()
                  : <Modal.Title>{title}</Modal.Title>
              }
            </Modal.Header>
          : null
      }

      {
        !previewBox
          ? <Modal.Body>
              {children}
            </Modal.Body>
          : [
            <div key="1" className="header">
              <div className="caption">{title}</div>
              <div className="close">
                <Button bsStyle="danger" bsSize="xsmall" onClick={this.close}>
                  <i className="nicon-cross"></i>
                </Button>
              </div>
            </div>,
            <div className="content" key="2">{children}</div>
          ]
      }

      {
        !previewBox && footer
          ? <Modal.Footer>
              {noFooter ? null :
                _.isFunction(footer)
                  ? footer()
                  : buttons
                    ? buttons
                    : [
                      okButton
                        ? <Button key="1" bsStyle={okBtnBsStyle
                            ? okBtnBsStyle
                            : "primary"} onClick={onOk} data-qa="qa-modal-ok">{okText}</Button>
                        : null,
                      closeButton
                        ? <Button key="2" bsStyle={cancelBtnBsStyle
                            ? cancelBtnBsStyle
                            : "default"} onClick={onClose} data-qa="qa-modal-close">{closeText}</Button>
                        : null
                    ]
              }
            </Modal.Footer>
          : null
      }
    </Modal>);
  }
}

ModalHelper.defaultProps = {
  footer: true,
  header: true
}
