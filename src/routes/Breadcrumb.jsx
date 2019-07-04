import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {withBreadcrumbs} from 'react-router-breadcrumbs-hoc';

import DefaultRouter from './DefaultRouter';

class Breadcrumb extends Component {
  render() {
    return (<div className="btn-group btn-breadcrumb">
      {
        this.props.breadcrumbs.map(({
          breadcrumb,
          path,
          match
        }, i) => {
          return (<NavLink key={i} to={match.url} className="btn btn-default">
            {breadcrumb}
          </NavLink>)
        })
      }
    </div>)
  }
}
export default withBreadcrumbs(DefaultRouter)(Breadcrumb);
