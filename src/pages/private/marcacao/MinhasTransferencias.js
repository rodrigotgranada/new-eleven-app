import React, { useState } from "react";
import useGetData from "../../../hooks/useGetData";
import { useAuth } from "../../../contexts/AuthContext";
import { Container, Row } from "reactstrap";
import Loading from "../../../components/public/Loading/Loading";
import { useEffect } from "react";
import moment from "moment";

const MinhasTransferencias = () => {
  const [filteredAgendamentos, setFilteredAgendamentos] = useState();
  const { currentUser } = useAuth();

  const {
    getDataWhereOrderByLimit: getMinhasMarcacoes,
    getDataWhere2: getMinhasTransferencias,
    data: minhasMarcacoes2,
    loadingMinhasMarcacoes2,
  } = useGetData();

  useEffect(() => {
    if (currentUser) {
      handleGetData();
    }
  }, [currentUser]);

  const handleGetData = async () => {
    const dataAtual = moment(new Date()).format("YYYY-MM-DD");
    console.log("dataAtual", dataAtual);
    console.log("meuUsuario", currentUser);
    const VAgendamento = await getMinhasTransferencias(
      "codTemp_transferAgenda",
      "userDestino",
      "==",
      currentUser?.uid,
      "validate",
      ">=",
      dataAtual
    );
    console.log("VAgendamento", VAgendamento);
    console.log("meuUsuario", currentUser);
  };

  return (
    <>
      <section>
        <Container>
          <Row className="row-meus-agendamentos">
            {loadingMinhasMarcacoes2 && (
              <Loading type={`spin`} width={"30px"} />
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MinhasTransferencias;
