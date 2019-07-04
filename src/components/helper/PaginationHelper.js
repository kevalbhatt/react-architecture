'use strict';
import React, {Component} from 'react';
import LoadingHelper from 'utils/component/LoadingHelper';
import InfiniteScroll from 'react-infinite-scroller';

class CustomeInfiniteScroll extends InfiniteScroll {
  constructor(props) {
    super(props)
  }
  componentDidUpdate() {
    const {containerEl, loader, beforeDidUpdate, isReverse, scrollAfterSucess} = this.props;
    if (!loader) {
      if (beforeDidUpdate) {
        beforeDidUpdate();
      }
      let doScroll = false;
      if (isReverse && containerEl && scrollAfterSucess) {
        if (_.isFunction(scrollAfterSucess)) {
          doScroll = scrollAfterSucess();
        } else {
          doScroll = scrollAfterSucess;
        }
      }
      if (doScroll) {
        let el = containerEl();
        el
          ? el.scrollTop = 65
          : null;
      }
      this.attachScrollListener();
    }
  }
  render() {
    let _props = this.props,
      children = _props.children,
      element = _props.element,
      hasMore = _props.hasMore,
      initialLoad = _props.initialLoad,
      isReverse = _props.isReverse,
      loader = _props.loader,
      loadMore = _props.loadMore,
      pageStart = _props.pageStart,
      ref = _props.ref,
      threshold = _props.threshold,
      useCapture = _props.useCapture,
      useWindow = _props.useWindow,
      props = _.omit(_props, [
        'children',
        'element',
        'hasMore',
        'initialLoad',
        'isReverse',
        'loader',
        'loadMore',
        'pageStart',
        'ref',
        'threshold',
        'useCapture',
        'useWindow',
        'containerEl',
        'scrollAfterSucess',
        'pageSize',
        'getData',
        'dataLength'
      ]);

    props.ref = (node) => {
      this.scrollComponent = node;
      if (ref) {
        ref(node);
      }
    };

    var childrenArray = [children];
    if (hasMore) {
      if (loader) {
        isReverse
          ? childrenArray.unshift(loader)
          : childrenArray.push(loader);
      } else if (this.defaultLoader) {
        isReverse
          ? childrenArray.unshift(this.defaultLoader)
          : childrenArray.push(this.defaultLoader);
      }
    }
    return React.createElement(element, props, childrenArray);
  }
}

export default class PaginationHelper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listHasMore: true,
      loading: this.props.initialLoad == true
    }
    this.initialScroll = true;
    this.pagination = {
      totalCount: null,
      startIndex: 0,
      pageSize: this.props.pageSize || 25,
      resultSize: null
    }
    // _.extend(this.pagination, this.props.defaultPagination);
  }
  incereamentStartIndex = () => {
    ++this.pagination.startIndex
  }
  getNextPage = () => {
    let pagination = this.pagination
    if (pagination) {
      if ((pagination.totalCount && pagination.totalCount > 0) || this.initialScroll) {
        // Increase startIndex by adding pageSize;
        pagination.startIndex += pagination.pageSize;
        if (this.initialScroll || pagination.startIndex < pagination.totalCount) {
          if (this.initialScroll) {
            if (this.props.dataLength === undefined) {
              throw new Error("getNextPage function need dataLength props for first time caclulation");
            } else if (this.props.dataLength < pagination.pageSize) {
              this.initialScroll = false;
              this.setState({listHasMore: false});
              return;
            }
          }
          if (this.props.getData) {
            this.setState({
              loading: true
            }, () => {
              this.props.getData({
                "viewType": "PaginationHelper",
                "queryParam": {
                  "startIndex": pagination.startIndex,
                  "pageSize": pagination.pageSize
                }
              }).then((options) => {
                if (this.initialScroll) {
                  this.initialScroll = false;
                }
                if (options) {
                  if (options.paginationParam == null) {
                    this.setState({listHasMore: false});
                  } else {
                    _.extend(this.pagination, options.paginationParam);
                    this.state.loading = false
                    let {startIndex, pageSize, totalCount} = options.paginationParam;
                    if (((startIndex + pageSize) - 1) >= totalCount) {
                      this.setState({listHasMore: false});
                    }
                  }
                } else {
                  this.setState({listHasMore: false});
                }
              });
            });
          }
        } else {
          this.setState({listHasMore: false});
        }
      } else {
        throw new Error("Total count is undefined");
        this.setState({listHasMore: false});
      }
    } else {
      this.setState({listHasMore: false});
    }
  }
  render() {
    const {loadMore, hasMore, loader, children} = this.props;
    return (<CustomeInfiniteScroll {...this.props} loadMore={loadMore || this.getNextPage} hasMore={hasMore || this.state.listHasMore} loader={this.state.loading
        ? loader
        : null}>
      {children}
    </CustomeInfiniteScroll>);
  }
}

PaginationHelper.defaultProps = {
  loader: (<div key="0" style={{
      padding: "10px"
    }}><LoadingHelper loading={true}/></div>),
  pageStart: 0,
  useWindow: true
};
