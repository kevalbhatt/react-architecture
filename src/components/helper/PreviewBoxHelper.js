'use strict';
import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import ModalHelper from 'utils/component/ModalHelper';
import LoadingHelper from 'utils/component/LoadingHelper';
import PdfViewerHelper from 'utils/component/PdfViewerHelper';
import bowser from 'bowser';
import _ from 'lodash';

export default class PreviewBoxHelper extends Component {
  constructor(poprs) {
    super(poprs)
    this.state = {
      modalView: {
        view: null,
        docView: this.props.docView
      }
    };
  }

  componentWillReceiveProps(newProps) {
    let updateModalView = false;
    const {docView} = this.state.modalView
    if (_.isBoolean(newProps.docView)) {
      if (newProps.docView !== docView) {
        updateModalView = true;
      }
    } else if (_.isObject(newProps.docView)) {
      if (newProps.docView.url !== docView.url || newProps.docView.loader !== docView.loader) {
        updateModalView = true;
      }
    }
    if (updateModalView) {
      let cloneModalView = _.cloneDeep(this.state.modalView);
      cloneModalView.docView = newProps.docView;
      this.setState({modalView: cloneModalView});
    }
  }

  getDocument = (options) => {
    this.isPreviewBoxClose = false;
    const onError = () => {
      this.updateModalView({component: (<div className="caption" style={{
          "color" : "red",
          "textAlign" : "center"
        }}>
        <h1>
          <i className="nicon-baffled"></i>
        </h1>
        <h2>Something went wrong!</h2>
      </div>)})
    }

    fetch({url: options.url, responseType: 'blob', skipApiHelper: true, replaceHeaders: true}).then(blob => {
      let component = {};
      if (blob && blob.data && blob.data.type == "application/pdf") {
        component = <PdfViewerHelper src={blob.data} loading={(<LoadingHelper loading={true} color="white"/>)} onLoadError={onError}/>;
      } else {
        let newurl = window.URL.createObjectURL(blob.data);
        component = <img className="img-responsive" src={newurl}/>;
      }
      return {isSucess: true, component: component};
    }, () => {
      return {isSucess: false}
    }).then((options) => {
      if (this.isPreviewBoxClose) {
        return;
      }
      if (options.isSucess) {
        this.updateModalView(options);
      } else {
        onError();
      }
    })
  }
  updateModalView = (options) => {
    if (options.component) {
      this.setState({
        modalView: {
          view: options.component,
          docView: _.isUndefined(options.docView)
            ? this.state.modalView.docView
            : options.docView
        }
      });
    }
  }
  handleOnClick = () => {
    const {previewComponent, children, showPreview} = this.props;
    const {docView} = this.state.modalView;
    let docComponent = null;
    if (showPreview !== false) {
      if (!_.isEmpty(docView) && _.isEmpty(previewComponent)) {
        this.getDocument(docView);
        this.updateModalView({
          component: docView.loader || (<LoadingHelper loading={true} color="white"/>)
        });
      } else {
        let component = null;
        if (previewComponent) {
          if (_.isFunction(previewComponent)) {
            component = previewComponent();
          } else {
            component = previewComponent;
          }
        } else {
          component = children;
        }
        this.updateModalView({component: component});
      }
    }
  }

  handleModalClose = () => {
    this.isPreviewBoxClose = true;
    let cloneModalView = _.cloneDeep(this.state.modalView);
    cloneModalView.view = null;
    this.setState({modalView: cloneModalView});
  }

  handleModalOpen = () => {
    this.isPreviewBoxClose = false;
  }
  render() {
    const {children, show, hideChildren, showPreview, className} = this.props;
    if (showPreview == false) {
      return children;
    } else {
      return [
        (
          hideChildren
          ? null
          : <div className={className} key="1" onClick={showPreview == false
              ? null
              : this.handleOnClick}>{children}</div>),
        <ModalHelper key="2" {...this.props} previewBox={true} docView={this.state.modalView.docView} onClose={this.handleModalClose} onOpen={this.handleModalOpen} show={!_.isEmpty(this.state.modalView.view)}>
          {
            this.state.modalView.view
              ? this.state.modalView.view
              : null
          }
        </ModalHelper>
      ]
    }
  }
}

PreviewBoxHelper.defaultProps = {
  docView: false
}
