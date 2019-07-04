import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import PDFJS from 'pdfjs-dist/webpack';
import {Document, Page, setOptions} from 'react-pdf/build/entry.webpack';

setOptions({cMapUrl: 'cmaps/', cMapPacked: true});

export default class PdfViewerHelper extends Component {
  state = {
    file: this.props.src,
    numPages: null
  }

  onDocumentLoadSuccess = ({numPages}) => this.setState({numPages})

  render() {
    const {file, numPages} = this.state;
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return (<div className="Example">
      <Document file={file} onLoadSuccess={this.onDocumentLoadSuccess}>
        {
          Array.from(new Array(numPages), (el, index) => (<Page renderMode="svg" scale={w > 360
              ? 1
              : 0.5} key={`page_${index + 1}`} pageNumber={index + 1}/>),)
        }
      </Document>
    </div>);
  }
}
