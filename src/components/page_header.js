import React from 'react';
import { PageHeader } from "react-bootstrap";

const MyPageHeader = ({title}) => {
  if (!title) {
    return <div></div>
  }
  return (
    <div className="row">
      <div className="col-lg-12">
        <PageHeader>{title}</PageHeader>
      </div>
    </div>
  );
};

export default MyPageHeader;
