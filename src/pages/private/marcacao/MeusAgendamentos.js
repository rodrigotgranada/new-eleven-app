import React, { useEffect, useState } from "react";
import { Col, Container, Label, Row } from "reactstrap";
import Loading from "../../../components/public/Loading/Loading";
import CardAgendamento from "../../../components/public/meusAgendamentos/CardAgendamento";
import { useAuth } from "../../../contexts/AuthContext";
import useGetData from "../../../hooks/useGetData";
import "../../../styles/public/meusAgendamentos.scss";
import { FormSelect } from "react-bootstrap";

const MeusAgendamentos = () => {
  const [filteredAgendamentos, setFilteredAgendamentos] = useState();
  const { currentUser } = useAuth();
  // const {
  //   getDataWhere: getMinhasMarcacoes,
  //   data: minhasMarcacoes,
  //   loadingMinhasMarcacoes,
  // } = useGetData();

  // const {
  //   getDataWhereSnap: getMinhasTransferencias,
  //   data: minhasTransferencias,
  //   loadingMinhasTransferencias,
  // } = useGetData();

  const {
    getDataWhereOrderByLimit: getMinhasMarcacoes2,
    data: minhasMarcacoes2,
    loadingMinhasMarcacoes2,
  } = useGetData();

  const {
    getDataOrderBy: getModalidades,
    data: modalidades,
    loading: carregaModalidades,
  } = useGetData();

  // useEffect(() => {
  //   console.log("minhasMarcacoes2", minhasMarcacoes2);
  // }, [minhasMarcacoes2]);

  // useEffect(() => {
  //   getMinhasTransferencias(
  //     "codTemp_transferAgenda",
  //     "userOrigem",
  //     "==",
  //     currentUser?.uid
  //   );
  // }, [minhasTransferencias]);

  useEffect(() => {
    Object.keys(minhasMarcacoes2).length > 0 &&
      setFilteredAgendamentos(minhasMarcacoes2);
  }, [minhasMarcacoes2]);

  useEffect(() => {
    // console.log("currentUser", currentUser);
    if (currentUser) {
      getModalidades("modalidades", "display", "asc");
      // getMinhasTransferencias(
      //   "codTemp_transferAgenda",
      //   "userOrigem",
      //   "==",
      //   currentUser?.uid
      // );
      getMinhasMarcacoes2(
        "agenda",
        "user",
        "==",
        currentUser?.uid,
        "codLocacao",
        "desc",
        20
      );
    }
  }, [currentUser]);

  const handleSearch = (filter) => {
    console.log("filter", filter);
    if (filter != "all") {
      const filtered = minhasMarcacoes2.filter((child) => {
        if (child?.esporte?.includes(filter)) {
          return child;
        }
      });
      setFilteredAgendamentos(filtered);
    } else {
      setFilteredAgendamentos(minhasMarcacoes2);
    }
  };

  return (
    <>
      <section>
        <Container>
          <Col lg="4">
            <Label>Filtro</Label>
            <FormSelect
              className="select-filter"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            >
              <option value="all">Todos</option>
              {modalidades &&
                modalidades.map((modalidade, index) => {
                  return (
                    <option key={index} value={modalidade.id}>
                      {modalidade.display}
                    </option>
                  );
                })}
            </FormSelect>
          </Col>
        </Container>
      </section>
      <section>
        <Container>
          <Row className="row-meus-agendamentos">
            {loadingMinhasMarcacoes2 && (
              <Loading type={`spin`} width={"30px"} />
            )}
            {console.log("MMMM", filteredAgendamentos)}
            {filteredAgendamentos &&
              filteredAgendamentos.length > 0 &&
              filteredAgendamentos.map((minhaMarcacao, index) => {
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
      </section>
    </>
  );
};

export default MeusAgendamentos;
