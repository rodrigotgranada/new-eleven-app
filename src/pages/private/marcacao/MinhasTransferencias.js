import React, { useState } from "react";
import useGetData from "../../../hooks/useGetData";
import { useAuth } from "../../../contexts/AuthContext";
import { Container, Row } from "reactstrap";
import Loading from "../../../components/public/Loading/Loading";
import { useEffect } from "react";
import moment from "moment";
import CardTransferencia from "../../../components/public/minhasTransferencias/CardTransferencia";

const MinhasTransferencias = () => {
  const [filteredAgendamentos, setFilteredAgendamentos] = useState([]);
  const { currentUser } = useAuth();

  const {
    getDataWhereOrderByLimit: getMinhasMarcacoes,
    getDataWhere3: getMinhasTransferencias,
    data: minhasMarcacoes2,
    loading: loadingMinhasMarcacoes2,
  } = useGetData();

  useEffect(() => {
    console.log("loadingMinhasMarcacoes2", loadingMinhasMarcacoes2);
    if (currentUser) {
      handleGetData();
    }
  }, [currentUser]);

  const handleGetData = async () => {
    const dataAtual = moment(new Date()).format("YYYY-MM-DD");
    // console.log("dataAtual", dataAtual);
    console.log("loadingANTES", loadingMinhasMarcacoes2);
    const VAgendamento = await getMinhasTransferencias(
      "codTemp_transferAgenda",
      "userDestino",
      "==",
      currentUser?.uid,
      "validate",
      ">=",
      dataAtual,
      "status",
      "==",
      "pendente"
    );
    console.log("VAgendamento", VAgendamento);
    console.log("meuUsuario", currentUser);

    setFilteredAgendamentos(VAgendamento);
  };

  return (
    <>
      <section>
        <Container>
          <Row className="row-meus-agendamentos">
            {loadingMinhasMarcacoes2 && (
              <Loading type={`spin`} width={"30px"} />
            )}
            {console.log(filteredAgendamentos.length)}
            {filteredAgendamentos && filteredAgendamentos.length === 0 && (
              <p>Não há transferencias</p>
            )}
            {filteredAgendamentos &&
              filteredAgendamentos.length > 0 &&
              filteredAgendamentos.map((minhaTransferencia, index) => {
                console.log("individual", minhaTransferencia);
                return (
                  <CardTransferencia
                    key={index}
                    transferencia={minhaTransferencia}
                    chave={index}
                  />
                );
              })}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MinhasTransferencias;
