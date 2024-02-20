import React, { useEffect, useState } from "react";
import Table from "./Table";
import "./../../../../styles/admin/permanentesList.scss";
import AddPermanente from "../modal/AddPermanente";
import ButtonEditPermanente from "./ButtonEditPermanente";
import useGetData from "../../../../hooks/useGetData";
import moment from "moment";
import CellName from "./Cells/CellName";
import CellHorario from "./Cells/CellHorario";
import CellQuadra from "./Cells/CellQuadra";
import CellModalidade from "./Cells/CellModalidade";

const Content = () => {
  const [conteudo, setConteudo] = useState({
    rowData: [],
  });
  const [selected, setSelected] = useState("none");
  const [filteredData, setFilteredData] = useState([]);
  const {
    getDataOrderByTeste: getPermanentes,
    data: permanentes,
    loading: loadingPermanentes,
  } = useGetData();

  useEffect(() => {
    (async () => {
      const values = await getPermanentes("permanentes", "dataFim", "asc");
    })();

    return () => {};
  }, []);

  useEffect(() => {
    setFilteredData(permanentes);
    // if (permanentes && permanentes.length > 0) {
    // setConteudo({
    //   rowData: formatRowData(permanentes),
    // });
    // } else {
    //   setConteudo({
    //     rowData: formatRowData(permanentes),
    //   });
    // }
  }, [permanentes]);

  useEffect(() => {
    console.log("filteredData", filteredData);
    setConteudo({
      rowData: formatRowData(filteredData),
    });
  }, [filteredData]);

  const hadleFilter = (e) => {
    console.log("hadleFilter", e.target.value);
    if (e.target.value === "none") {
      setFilteredData(permanentes);
      setSelected("none");
    } else {
      const result = permanentes.filter(
        (item) => item.diaSemana === e.target.value
      );
      setFilteredData(result);
      setSelected(e.target.value);
    }
    // console.log("result", result);
  };

  const diasSemana = [
    "Domingo",
    "Segunda",
    "Terca",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabado",
  ];

  const columns = [
    {
      id: "name",
      Header: () => {
        // const handleSearch = (e) => {
        //   console.log(e.target.value);
        // };
        return (
          <>
            <h5>Nome</h5>
            {/* <input
              type="text"
              name="name"
              id="name"
              placeholder="Filtrar por nome"
              // defaultValue={baseUrl.year}
              onChange={handleSearch}
            /> */}
          </>
        );
      },
      accessor: (d) => {
        return (
          <>
            <CellName id={d.nome} />
          </>
        );
      },
    },
    {
      id: "dia", // Required because our accessor is not a string,
      Header: () => {
        return (
          <>
            <h5>Dia</h5>
            <select
              name={"winner"}
              id={"winner"}
              className="winner"
              onChange={hadleFilter}
              defaultValue={selected}
            >
              <option value={"none"}>Todos</option>
              {diasSemana.map((dia, index) => {
                return (
                  <option key={index} value={dia}>
                    {dia}
                  </option>
                );
              })}
            </select>
          </>
        );
      },
      accessor: "dia",
    },
    {
      Header: "Horário",
      accessor: (d) => {
        return (
          <>
            <CellHorario id={d.horario} />
          </>
        );
      },
    },
    {
      Header: "Quadra",
      accessor: (d) => {
        return (
          <>
            <CellQuadra id={d.quadra} />
          </>
        );
      },
    },
    {
      Header: "Modalidade",
      accessor: (d) => {
        return (
          <>
            <CellModalidade id={d.modalidade} />
          </>
        );
      },
    },
    {
      Header: "Inicio",
      accessor: (d) => {
        return (
          <>
            <p> {moment(d.inicio).format("DD/MM/YYYY")} </p>
          </>
        );
      },
    },
    {
      Header: "Vencimento",
      // accessor: "vencimento",
      accessor: (d) => {
        return (
          <>
            <p> {moment(d.vencimento).format("DD/MM/YYYY")} </p>
          </>
        );
      },
    },
    {
      Header: "Ações",
      accessor: (d) => {
        return (
          <>
            <ButtonEditPermanente data={d} />
          </>
        );
      },
    },
  ];

  const formatRowData = (rawData) =>
    rawData.map((info) => ({
      id: info.id,
      nome: info.user,
      dia: info.diaSemana,
      horario: info.hora,
      quadra: info.quadra,
      modalidade: info.esporte,
      inicio: info.dataInicio,
      vencimento: info.dataFim,
      acoes: info.id,
    }));
  return (
    <>
      {/* <h1>Permanentes</h1> */}
      <Table
        columns={columns}
        data={conteudo.rowData}
        isLoading={loadingPermanentes}
      />
    </>
  );
};

export default Content;
