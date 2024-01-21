import React, { useState } from "react";
import useGetData from "../../../hooks/useGetData";
import { useAuth } from "../../../contexts/AuthContext";
import { Col, Container, Label, Row } from "reactstrap";
import Loading from "../../../components/public/Loading/Loading";
import { useEffect } from "react";
import moment from "moment";
import CardTransferencia from "../../../components/public/minhasTransferencias/CardTransferencia";

const MinhasTransferencias = () => {
  const [filteredAgendamentos, setFilteredAgendamentos] = useState([]);
  const { currentUser } = useAuth();

  const {
    // getDataWhereOrderByLimit: getMinhasMarcacoes,
    // getDataSnapAtt: getSnap,
    getDataWhere3: getMinhasTransferencias,
    data: minhasMarcacoes2,
    loading: loadingMinhasMarcacoes2,
  } = useGetData();

  useEffect(() => {
    if (currentUser) {
      handleGetData();
      // getMinhasTransferencias(
      //   "codTemp_transferAgenda",
      //   "userDestino",
      //   "==",
      //   currentUser?.uid,
      //   "validate",
      //   ">=",
      //   dataAtual,
      //   "status",
      //   "==",
      //   "pendente"
      // );
    }
  }, [currentUser]);

  useEffect(() => {
    if (minhasMarcacoes2) {
      console.log("minhasMarcacoes2", minhasMarcacoes2);
      setFilteredAgendamentos(minhasMarcacoes2);
    }
  }, [minhasMarcacoes2]);

  const handleGetData = async () => {
    const dataAtual = moment(new Date()).format("YYYY-MM-DD");
    getMinhasTransferencias(
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

    // console.log("dadosSnap", dadosSnap);

    // setFilteredAgendamentos(dadosSnap);
  };

  return (
    <>
      <section>
        <Container>
          <Col lg="4">
            <button
              type={"button"}
              className="btn btn-warning"
              onClick={() => handleGetData()}
            >
              Recarregar
            </button>
          </Col>
        </Container>
      </section>
      <section>
        <Container>
          <Row className="row-meus-agendamentos">
            {loadingMinhasMarcacoes2 && (
              <Loading type={`spin`} width={"30px"} />
            )}
            {console.log(
              "Transfer",
              filteredAgendamentos.length,
              filteredAgendamentos
            )}
            {!filteredAgendamentos && <p>Não há transferencias</p>}
            {filteredAgendamentos &&
              filteredAgendamentos.map((minhaTransferencia, index) => {
                console.log("individual", minhaTransferencia);
                console.log("index", index);
                return (
                  // <p key={index}>TEste</p>
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
