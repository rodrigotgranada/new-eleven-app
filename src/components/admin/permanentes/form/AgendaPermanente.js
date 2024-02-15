import React, { useEffect, useState } from "react";
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
import useGetData from "../../../../hooks/useGetData";
import TabsQuadras from "./TabsQuadras";
import Loading from "../../../public/Loading/Loading";

const AgendaPermanente = ({ selectedQuadra, setSelectedQuadra }) => {
  const {
    getData: getTiposQuadras,
    data: tiposQuadras,
    loadingTiposQuadras,
  } = useGetData();

  useEffect(() => {
    getTiposQuadras("tiposQuadra");
  }, []);

  return (
    <>
      {loadingTiposQuadras && <Loading type={`spin`} width={"30px"} />}
      {tiposQuadras && tiposQuadras.length > 0 && (
        <TabsQuadras tiposQuadras={tiposQuadras} />
      )}
    </>
  );
};

export default AgendaPermanente;
