import React from "react";
import { Button } from "antd";

const ReportButton = ({ href, target, onClick, children }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      href={href}
      // disableElevation
      onClick={onClick}
      target={target}
    >
      {children}
    </Button>
  );
};

export default ReportButton;
