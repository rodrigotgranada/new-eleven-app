import React, { useEffect, useState } from "react";
import { Container, FormSelect, Row } from "react-bootstrap";
import { Col, Label } from "reactstrap";
import CardQuadra from "../../../components/admin/quadrasMenu/CardQuadra";
import MenuAddQuadra from "../../../components/admin/quadrasMenu/MenuAddQuadra";
import useGetData from "../../../hooks/useGetData";
import "../../../styles/admin/listQuadra.scss";

const Quadras = () => {
  const [search, setSearch] = useState("");
  const [filteredQuadras, setFilteredQuadras] = useState();
  const [menuBotoes, setMenuBotoes] = useState(null);
  const {
    getDataOrderBy2: getQuadras,
    data: quadras,
    loading: carregaQuadras,
  } = useGetData();

  const {
    getData: getFoto,
    data: fotoPadrao,
    loading: carregaFotoPadrao,
  } = useGetData();

  const {
    getData: getTiposQuadras,
    data: tiposQuadras,
    loading: carregaTiposQuadras,
  } = useGetData();

  const {
    getDataOrderBy: getModalidades,
    data: modalidades,
    loading: carregaModalidades,
  } = useGetData();

  useEffect(() => {
    getQuadras("quadras", "esportes", "asc", "numero", "asc");
    getModalidades("modalidades", "display", "asc");
    getFoto("fotoPadrao");
    getTiposQuadras("tiposQuadra");
  }, []);

  useEffect(() => {
    Object.keys(quadras).length > 0 && setFilteredQuadras(quadras);
  }, [quadras]);

  useEffect(() => {
    setMenuBotoes(tiposQuadras);
  }, [tiposQuadras]);

  const handleSearch = (filter) => {
    console.log("filter", filter);
    if (filter != "all") {
      const filtered = quadras.filter((child) => {
        if (child?.esportes?.includes(filter)) {
          return child;
        }
      });
      setFilteredQuadras(filtered);
    } else {
      setFilteredQuadras(quadras);
    }
  };
  return (
    <>
      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul
                className="admin__menu-list"
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  gap: "3rem",
                }}
              >
                {menuBotoes &&
                  tiposQuadras &&
                  menuBotoes.map((btn, i) => {
                    return (
                      <MenuAddQuadra
                        key={i}
                        type={btn.type}
                        display={btn.display}
                        id={btn.id}
                      />
                    );
                  })}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
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
          <Row className="container-quadras">
            {/* <Col lg="12"> */}
            {carregaQuadras && <p> Carregando....</p>}

            {filteredQuadras &&
              filteredQuadras.map((quadra, index) => {
                return <CardQuadra key={index} quadra={quadra} />;
                // return <ListQuadra key={index} quadra={quadra} index={index} />;
              })}
            {/* </Col> */}
          </Row>
          {/* <div
            style={{
              width: "100%",
              margin: "20px auto",
              display: "flex",
              flexWrap: "wrap",
            }}
          > */}

          {/* </div> */}
        </Container>
      </section>
    </>
  );
};

export default Quadras;
