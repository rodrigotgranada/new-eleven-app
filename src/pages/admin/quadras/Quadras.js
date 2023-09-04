import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import MenuAddQuadra from "../../../components/admin/quadrasMenu/MenuAddQuadra";
import ListQuadra from "../../../components/public/formComponents/ListQuadra";
import useGetData from "../../../hooks/useGetData";

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
    const data = quadras;
    const result = data
      .map((item) => ({
        ...item,
        esportes: item.esportes.filter((child) => child.includes(filter)),
      }))
      .filter((item) => item.esportes.length > 0);
    setFilteredQuadras(result);
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
          <select
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          >
            <option value="">Todos</option>
            {modalidades &&
              modalidades.map((modalidade, index) => {
                return (
                  <option value={modalidade.id}>{modalidade.display}</option>
                );
              })}
          </select>
        </Container>
      </section>
      <section>
        <Container>
          <div
            style={{
              width: "100%",
              margin: "20px auto",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {carregaQuadras && <p> Carregando....</p>}

            {filteredQuadras &&
              filteredQuadras.map((quadra, index) => {
                return <ListQuadra key={index} quadra={quadra} index={index} />;
              })}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Quadras;
