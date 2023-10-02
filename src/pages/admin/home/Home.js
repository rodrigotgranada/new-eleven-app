import React from "react";

const AdminHome = () => {
  const random = () => {
    return Math.floor(Math.random() * 900000) + 100000;
  };

  return <div>{random}</div>;
};

export default AdminHome;
