import React from "react";
import { AgendaProvider } from "../../../contexts/AgendaContext";
import ListDates from "../../../components/admin/agenda/ListDates";
import { Container, Row } from "reactstrap";

const Agenda = () => {
  return (
    <Container>
      <Row>
        <AgendaProvider>
          <ListDates />
        </AgendaProvider>
      </Row>
    </Container>
  );
};

export default Agenda;
