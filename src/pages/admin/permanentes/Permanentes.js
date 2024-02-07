import React from "react";
import { Container, Row } from "reactstrap";
import ListPermanentes from "../../../components/admin/permanentes/ListPermanentes";

const Permanentes = () => {
  return (
    <Container>
      <Row>
        <ListPermanentes />
      </Row>
    </Container>
  );
};

export default Permanentes;
