import React from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';

const StatWidget = (props) => {
    const footerText = "pull-left ".concat(props.css);
    const icon = "pull-right ".concat(props.css);

		return (
    <Panel className="stat" bsStyle={props.style}

      header={
        <div className="stat-panel-heading row">
          <div className="col-xs-3">
            <span className="big_icon"><Glyphicon glyph={props.icon} /></span>
          </div>
          <div className="col-xs-9 text-right">
            <div className="huge">{props.count}</div>
            <div>{props.headerText}</div>
          </div>
        </div>
      }

      footer={
        <Link to={props.linkTo}>
          <span className={footerText}>{props.footerText}</span>
          <span className={icon}><Glyphicon glyph="circle-arrow-right" /></span>
          <div className="clearfix"></div>
        </Link>
      }
      />

  );
};

export default StatWidget;
