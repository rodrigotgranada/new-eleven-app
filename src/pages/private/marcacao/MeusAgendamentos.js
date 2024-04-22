import React, { useEffect, useState } from "react";
import { Col, Container, Label, Row } from "reactstrap";
import Loading from "../../../components/public/Loading/Loading";
import CardAgendamento from "../../../components/public/meusAgendamentos/CardAgendamento";
import { useAuth } from "../../../contexts/AuthContext";
import useGetData from "../../../hooks/useGetData";
import "../../../styles/public/meusAgendamentos.scss";
import { FormSelect } from "react-bootstrap";
import moment from "moment";

const MeusAgendamentos = () => {
  const [filteredAgendamentos, setFilteredAgendamentos] = useState();
  const { currentUser } = useAuth();

  const {
    getDataWhereOrderByLimit2: getMinhasMarcacoes3,
    data: minhasMarcacoes2,
    loading: loadingMinhasMarcacoes2,
  } = useGetData();

  const {
    getDataOrderBy: getModalidades,
    data: modalidades,
    loading: carregaModalidades,
  } = useGetData();
  useEffect(() => {
    Object.keys(minhasMarcacoes2).length > 0 &&
      setFilteredAgendamentos(minhasMarcacoes2);
  }, [minhasMarcacoes2]);

  useEffect(() => {
    if (currentUser) {
      getModalidades("modalidades", "display", "asc");
      const dataAtual = moment(new Date()).format("YYYY-MM-DD");
      getMinhasMarcacoes3(
        "agenda",
        "user",
        "==",
        currentUser?.uid,
        "dataDia",
        ">=",
        dataAtual,
        "dataDia",
        "asc",
        10
      );
    }
  }, [currentUser]);

  const handleSearch = (filter) => {
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
      <section className="sectionResultsAgendamento">
        <Container>
          <Row className="row-meus-agendamentos">
            {loadingMinhasMarcacoes2 && (
              <Loading type={`spin`} width={"30px"} />
            )}
            {filteredAgendamentos && filteredAgendamentos?.length == 0 && (
              <p> Nenhum registro encontrado </p>
            )}

            {filteredAgendamentos && filteredAgendamentos?.length != 0 && (
              <div className="legendas">
                <div className="legenda card-with-individual"></div>{" "}
                <span>Individual</span>
                <div className="legenda card-with-transfer"></div>{" "}
                <span>Transferida</span>
                <div className="legenda card-with-permanente"></div>{" "}
                <span>Permanente</span>
              </div>
            )}

            {filteredAgendamentos &&
              filteredAgendamentos.length > 0 &&
              filteredAgendamentos.map((minhaMarcacao, index) => {
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
