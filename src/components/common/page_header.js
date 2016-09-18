import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

function renderBreadcrumbs(display, title) {
  if (!display) {
    return (<div></div>);
  }

  return (
    <div className="col-xs-12 col-lg-4 col-md-6 pull-right breadcrumb-wrapper">
      <span className="label">You are here:</span>
      <ol className="breadcrumb">
        <li><Link to="/">Digital Business Platform</Link></li>
        <li className="active">{title}</li>
      </ol>
    </div>
  );
};

const MyPageHeader = ({title, icon, display = true}) => {
  if (!title || !icon) {
    return (<div></div>);
  }
  return (
    <div className="page-header">
        <div className="row">
          <h2 className="col-lg-4 col-md-8">
            <FontAwesome name={icon} />
            &nbsp;{title}
          </h2>
          { renderBreadcrumbs(display, title) }
        </div>
    </div>
  );
};

export default MyPageHeader;
