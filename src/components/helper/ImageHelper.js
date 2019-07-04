'use strict';
import {Lazy} from 'react-lazy';
import React, {Component} from 'react';
import LoadingHelper from 'utils/component/LoadingHelper';
import PreviewBoxHelper from 'utils/component/PreviewBoxHelper';

export default class ImageHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      status: 'not-started',
      src: this.props.src
    };
  }
  onError = () => {}
  handleImageLoaded() {
    this.setState({imageLoaded: true, status: 'sucess'});
  }

  handleImageErrored() {
    this.setState({
      imageLoaded: true,
      status: 'failed',
      src: this.props.errorSrc || 'img/no_image_available.jpg'
    });
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isUndefined(nextProps && nextProps.src)) {
      this.setState({src: nextProps.src});
    }
  }

  getImgComponent() {
    const {imageLoaded, status, src} = this.state;
    const {
      imgStyle,
      className,
      alt,
      imgProps,
      imgRender,
      renderAsBackground
    } = this.props;

    if (imgRender) {
      return imgRender(this.props);
    } else if (renderAsBackground && imageLoaded) {
      return <div {...imgProps} className={className} style={{
          "backgroundImage" : `url(${src})`
        }}></div>
    } else {
      return <img {...imgProps} style={_.extend({
          opacity: (
            imageLoaded && status == "sucess"
            ? 1
            : 0)
        }, imgStyle)} alt={alt} onLoad={this.handleImageLoaded.bind(this)} onError={this.handleImageErrored.bind(this)} className={className} src={src}/>;
    }
  }

  getLazyLoadComponent({image, withoutParent}) {
    const {
        lazyProps,
        lazyClassName,
        style,
        inline,
        parentStyle,
        loaderStyle,
        loadingProps,
        renderAsBackground,
        imgRender
      } = this.props, {imageLoaded, status, src} = this.state;
    let display = "block";
    if (inline) {
      display = "inline-block";
    }
    return <Lazy {...lazyProps} component="div" className={lazyClassName} ltIE9={true} style={_.extend({
        display: display
      }, style)}>
      {
        withoutParent
          ? image
          : <div style={_.extend({
                display: display,
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden"
              }, parentStyle)}>
              {image}
            </div>
      }
      {
        !imageLoaded
          ? <LoadingHelper loading={true} style={_.extend({
                position: "absolute",
                top: "calc(50% - 12pt)",
                left: 0,
                right: 0
              }, loaderStyle)} {...loadingProps}></LoadingHelper>
          : null
      }
    </Lazy>
  }
  render() {
    const {showPreview, title} = this.props;
    const image = this.getImgComponent(),
      lazyLoadImg = this.getLazyLoadComponent({image}),
      lazyLoadImgWithoutParent = this.getLazyLoadComponent({image: image, withoutParent: true});
    return (
      showPreview
      ? <PreviewBoxHelper previewComponent={lazyLoadImgWithoutParent} title={title} showPreview={showPreview}>
        {lazyLoadImg}
      </PreviewBoxHelper>
      : lazyLoadImg);
  }
};
ImageHelper.defaultProps = {
  imgProps: {},
  loadingProps: {},
  lazyProps: {}
};
