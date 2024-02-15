import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import Horas from "./Horas";
import Dias from "./Dias";
import PermanenteContext from "../../../../contexts/PermanenteContext";
import Quadras from "./Quadras";
import StartDate from "./StartDate";

const TabsQuadras = ({ tiposQuadras }) => {
  useEffect(() => {
    console.log("tiposQuadras", tiposQuadras);
  }, [tiposQuadras]);

  const [currentActiveTab, setCurrentActiveTab] = useState(tiposQuadras[0]?.id);
  const { permanente, setPermanente } = useContext(PermanenteContext);

  useEffect(() => {
    let dias = { ...permanente };
    dias.tipoQuadra = currentActiveTab;

    dias.hora = null;

    dias.quadra = null;
    setPermanente(dias);
  }, [currentActiveTab]);

  useEffect(() => {
    return () => {};
  }, [permanente]);

  const toggle = (tab) => {
    if (currentActiveTab !== tab) {
      setCurrentActiveTab(tab);
    }
  };
  return (
    <div>
      <Nav tabs>
        {tiposQuadras.map((tipo, index) => {
          return (
            <NavItem key={index}>
              <NavLink
                className={currentActiveTab === tipo.id ? "active" : ""}
                onClick={() => {
                  toggle(tipo.id);
                }}
              >
                {tipo.display}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
      <TabContent activeTab={currentActiveTab}>
        {tiposQuadras.map((tipo, index) => {
          return (
            <TabPane tabId={tipo.id} key={index}>
              <Row>
                <Col sm="6">
                  <Dias esporte={tipo.id} />
                </Col>

                {permanente.diaSemana && (
                  <Col sm="6">
                    <Horas />
                  </Col>
                )}
                {permanente.hora && (
                  <Col sm="12">
                    <Quadras />
                  </Col>
                )}
                {permanente.quadra && (
                  <Col sm="3">
                    <StartDate />
                  </Col>
                )}
                {/* </Col> */}
              </Row>
            </TabPane>
          );
        })}
        {/* <TabPane tabId={currentActiveTab}>
          <Row>
            <Col sm="12">

              <Dias esporte={currentActiveTab} />
              {permanente.diaSemana && <Horas />}
            </Col>
          </Row>
        </TabPane> */}
      </TabContent>
    </div>
  );
};

export default TabsQuadras;
