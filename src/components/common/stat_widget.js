import React from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';

const StatWidget = (props) => {
		return (
      <Panel className="stat" bsStyle={props.style}

        header={<div className="stat-panel-heading row">
                  <div className="col-xs-3">
                      <span className="big_icon"><Glyphicon glyph={props.icon} /></span>
                  </div>
                  <div className="col-xs-9 text-right">
                      <div className="huge">{props.count}</div>
                      <div>{props.headerText}</div>
                  </div>
                </div>}

        footer={<Link to={props.linkTo}>
                  <span className="pull-left">{props.footerText}</span>
                  <span className="pull-right"><Glyphicon glyph="circle-arrow-right" /></span>
                  <div className="clearfix"></div>
                </Link>}
      />

		);
};

export default StatWidget;
