import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import ListLogs from "./ListLogs";
import FilterLogs from "./FilterLogs";
import useGetData from "../../../hooks/useGetData";
import Loading from "../../public/Loading/Loading";

const LogsContent = () => {
  const { getDataOrderByLogs, data, loading } = useGetData();
  const [quantidade, setQuantidade] = useState(5);
  useEffect(() => {
    attList();

    return () => {};
  }, []);

  useEffect(() => {
    console.log("LOGS", data);

    return () => {};
  }, [data]);

  const attList = async () => {
    getDataOrderByLogs("log_agenda", "createdAt", "desc", quantidade);
  };

  return (
    <>
      <Container>
        <Row>
          {loading && <Loading type={`spin`} width={"30px"} />}
          {!data || (data.length == 0 && <p> Nenhum Log Encontrado</p>)}
          {data && data.length > 0 && (
            <>
              <Col lg="6">
                <FilterLogs />
              </Col>
              <Col lg="6">
                <ListLogs logs={data} />
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default LogsContent;
