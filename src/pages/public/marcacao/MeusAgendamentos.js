import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import CardAgendamento from "../../../components/public/meusAgendamentos/CardAgendamento";
import { useAuth } from "../../../contexts/AuthContext";
import useGetData from "../../../hooks/useGetData";
import "../../../styles/public/meusAgendamentos.scss";

const MeusAgendamentos = () => {
  const { currentUser } = useAuth();
  const {
    getDataWhere: getMinhasMarcacoes,
    data: minhasMarcacoes,
    loadingMinhasMarcacoes,
  } = useGetData();

  const {
    getDataWhereOrderByLimit: getMinhasMarcacoes2,
    data: minhasMarcacoes2,
    loadingMinhasMarcacoes2,
  } = useGetData();

  // useEffect(() => {
  //   console.log("minhasMarcacoes2", minhasMarcacoes2);
  // }, [minhasMarcacoes2]);

  useEffect(() => {
    // console.log("currentUser", currentUser);
    if (currentUser) {
      // getMinhasMarcacoes("agenda", "owner", "==", currentUser?.uid);
      getMinhasMarcacoes2(
        "agenda",
        "owner",
        "==",
        currentUser?.uid,
        "dataDia",
        "desc",
        20
      );
    }
  }, [currentUser]);

  return (
    <>
      <Container>
        {/* <Row className="row-meus-agendamentos">
          {loadingMinhasMarcacoes && <p>Carregando...</p>}

          {minhasMarcacoes &&
            minhasMarcacoes.length > 0 &&
            minhasMarcacoes.map((minhaMarcacao, index) => {
              return (
                <CardAgendamento
                  key={index}
                  marcacao={minhaMarcacao}
                  chave={index}
                />
              );
            })}
        </Row> */}

        <Row className="row-meus-agendamentos">
          {loadingMinhasMarcacoes2 && <p>Carregando...</p>}
          {minhasMarcacoes2 &&
            minhasMarcacoes2.length > 0 &&
            minhasMarcacoes2.map((minhaMarcacao, index) => {
              console.log(minhaMarcacao);
              return (
                <CardAgendamento
                  key={index}
                  marcacao={minhaMarcacao}
                  chave={index}
                />
              );
            })}
        </Row>
      </Container>
    </>
  );
};

export default MeusAgendamentos;