import React from "react";
import { Container, Row } from "reactstrap";
import { ChurrasqueiraProvider } from "../../../contexts/ChurrasqueiraContext";
import Content from "../../../components/admin/churrasqueiras/Content";

const Churrasqueiras = () => {
  return (
    <Container>
      <Row>
        <ChurrasqueiraProvider>
          <Content />
        </ChurrasqueiraProvider>
      </Row>
    </Container>
  );
};
export default Churrasqueiras;
