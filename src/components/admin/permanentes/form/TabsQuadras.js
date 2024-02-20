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
import Esportes from "./Esportes";

const TabsQuadras = ({ tiposQuadras }) => {
  useEffect(() => {
    console.log("tiposQuadras", tiposQuadras);
  }, [tiposQuadras]);

  const [currentActiveTab, setCurrentActiveTab] = useState(tiposQuadras[0]?.id);
  const { permanente, setPermanente } = useContext(PermanenteContext);

  useEffect(() => {
    let dias = { ...permanente };
    dias.tipoQuadra = currentActiveTab;
    dias.hora = "";
    dias.quadra = "";
    dias.esporte = "";
    dias.dataInicio = "";
    setPermanente(dias);
  }, [currentActiveTab]);

  // useEffect(() => {
  //   return () => {};
  // }, [permanente]);

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
              {/* {tipo.display} */}
              <Row className={`row-main-add-permanentes`}>
                <Col sm="12" className={`btns-permanentes-menu`}>
                  <Dias esporte={tipo.id} />
                </Col>

                {permanente.diaSemana && (
                  <Col sm="12" className={`btns-permanentes-menu`}>
                    <Horas />
                  </Col>
                )}
                {permanente.hora && (
                  <Col sm="12" className={`btns-permanentes-menu`}>
                    <Quadras />
                  </Col>
                )}
                {permanente.quadra && (
                  <Col sm="12" className={`btns-permanentes-menu`}>
                    <Esportes />
                  </Col>
                )}
                {permanente.esporte && (
                  <Col sm="12" className={`btns-permanentes-menu`}>
                    <StartDate />
                  </Col>
                )}
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
