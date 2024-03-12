import React from "react";

const ListLogs = ({ logs }) => {
  return (
    <>
      <h1>TODOS LOGS</h1>
      {logs.map((log, index) => {
        return <p key={index}> {log.texto}</p>;
      })}
    </>
  );
};

export default ListLogs;
