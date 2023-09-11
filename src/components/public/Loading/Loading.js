import React from "react";
import ReactLoading from "react-loading";
import "./../../../styles/public/loading.scss";

const Loading = ({ type, width, height }) => {
  return (
    <ReactLoading
      type={type}
      width={width}
      height={height}
      className="loadDefault"
    />
  );
};

export default Loading;
