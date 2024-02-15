import React from "react";
import { Container, Row } from "reactstrap";
import ListPermanentes from "../../../components/admin/permanentes/ListPermanentes";
import { PermanenteProvider } from "../../../contexts/PermanenteContext";

const Permanentes = () => {
  return (
    <Container>
      {/* <Row> */}
      <PermanenteProvider>
        <ListPermanentes />
      </PermanenteProvider>
      {/* </Row> */}
    </Container>
  );
};

export default Permanentes;
