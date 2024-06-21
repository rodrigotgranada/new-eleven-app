import React, { useEffect, useRef, useState } from "react";
import Table from "./Table";
import "./../../../../styles/admin/permanentesList.scss";
import AddPermanente from "../modal/AddPermanente";
import Select from "react-select";
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
  // const [selectedNome, setSelectedNome] = useState(null);
  const selectedNome = useRef("");
  const selectedDia = useRef("");
  const selectedHorario = useRef("");
  const selectedQuadra = useRef("");
  const selectedEsporte = useRef("");
  
  const [filteredData, setFilteredData] = useState([]);
  const {
    getDataOrderByTeste: getPermanentes,
    data: permanentes,
    loading: loadingPermanentes,
  } = useGetData();
  
  const { getAllUsers: getUsers, data: users, loadingUsers } = useGetData();

  const {
    getDataOrderByTeste: getHorarios,
    data: horarios,
    loading: loadHorarios,
  } = useGetData();

  const {
    getData: getQuadras,
    data: quadras,
    loading: loadQuadras,
  } = useGetData();

  const {
    getData: getModalidades,
    data: modalidades,
    loading: loadMoadalidade,
  } = useGetData();

  useEffect(() => {
    (async () => {
      const permanentes_value = await getPermanentes("permanentes", "dataFim", "asc");      
      const users_value = await getUsers("users");
      const horarios_value = await getHorarios("horarios", "value", "asc");
      const quadras_value = await getQuadras("quadras");
      const modalidades_value = await getModalidades("modalidades");
    })();

    return () => {};
  }, []);

  useEffect(() => {
    setFilteredData(permanentes);
  }, [permanentes]);

  useEffect(() => {
    // console.log("filteredData", filteredData);
    setConteudo({
      rowData: formatRowData(filteredData),
    });
  }, [filteredData]);


const handleFilter2 = (e) => {
  const result = permanentes.filter( (item) => {
    return ( 
      (item.user === selectedNome.current?.id || !selectedNome.current?.id)
      && (item.diaSemana === selectedDia.current.value || !selectedDia.current.value)
      && (item.hora === selectedHorario.current.value || !selectedHorario.current.value)
      && (item.quadra === selectedQuadra.current.value || !selectedQuadra.current.value)
      && (item.esporte === selectedEsporte.current.value || !selectedEsporte.current.value)
    )
  })
  setFilteredData(result);
}


const selectPlayer = (usuario) => {
  selectedNome.current = usuario
  // console.log(selectedNome)
  handleFilter2()
  // setSelectedNome(usuario)
}
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
            <h5 className="permanente-th">Nome</h5>
            {/* <input
              type="text"
              name="name"
              id="name"
              placeholder="Filtrar por nome"
              ref={selectedNome}
               defaultValue={selectedNome.current.value}
              onChange={handleFilter2}
            /> */}
            <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                name="color"
                options={users}
                getOptionLabel={(option) =>
                  `${option.displayName} ${option.sobrenome} - (${option.telefone})`
                }
                value={selectedNome.current || ""}
                innerRef={selectedNome}
                getOptionValue={(option) => option.id}
                onChange={(e) => {
                  return selectPlayer(e)
                }}
                placeholder={"Selecione um usuário"}
                noOptionsMessage={() => "Usuário não encontrado"}
              />
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
            <h5 className="permanente-th">Dia</h5>
            <select
              name={"dia"}
              id={"dia"}
              className="dia"
              ref={selectedDia}
              onChange={handleFilter2}
              defaultValue={selectedDia.current.value}
            >
              <option value={""}>Todos</option>
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
      id: "horario",
      Header: () => {
        return (
          <>
            <h5 className="permanente-th">Horário</h5>
            <select
              name={"horario"}
              id={"horario"}
              className="horario"
              ref={selectedHorario}
              onChange={handleFilter2}
              defaultValue={selectedHorario.current.value}
            >
              <option value={""}>Todos</option>
              {horarios.map((horario, index) => {
                 return (
                  <option key={index} value={horario?.id}>
                    {horario?.value}
                  </option>
                );
              })}
            </select>
          </>
        );
      },
      //Header: "Horário",
      accessor: (d) => {
        // console.log('d', d)
        return (
          <>
            <CellHorario id={d.horario} />
          </>
        );
      },
    },
    {
      id: "quadra",
      Header: () => {
        return (
          <>
            <h5 className="permanente-th">Quadra</h5>
            <select
              name={"quadra"}
              id={"quadra"}
              className="quadra"
              ref={selectedQuadra}
              onChange={handleFilter2}
              defaultValue={selectedQuadra.current.value}
            >
              <option value={""}>Todos</option>
              {quadras.map((quadra, index) => {
                return (
                  <option key={index} value={quadra?.id}>
                    {`${quadra?.name} (${quadra?.numero})`}
                  </option>
                );
              })}
            </select>
          </>
        );
      },
      // Header: "Quadra",
      accessor: (d) => {
        return (
          <>
            <CellQuadra id={d.quadra} />
          </>
        );
      },
    },
    {
      id: "modalidade",
      Header: () => {
        return (
          <>
            <h5 className="permanente-th">Modalidade</h5>
            <select
              name={"modalidade"}
              id={"modalidade"}
              className="modalidade"
              ref={selectedEsporte}
              onChange={handleFilter2}
              defaultValue={selectedEsporte.current.value}
            >
              <option value={""}>Todos</option>
              {modalidades.map((modalidade, index) => {
                return (
                  <option key={index} value={modalidade.id}>
                    {modalidade.display}
                  </option>
                );
              })}
            </select>
          </>
        );
      },
      //Header: "Modalidade",
      accessor: (d) => {
        return (
          <>
            <CellModalidade id={d.modalidade} />
          </>
        );
      },
    },
    {
      id: "inicio",
      Header: () => {
        return (
          <>
            <h5 className="permanente-th">Inicio</h5>
          </>
        );
      },
      //Header: "Inicio",
      accessor: (d) => {
        return (
          <>
            <p> {moment(d.inicio).format("DD/MM/YYYY")} </p>
          </>
        );
      },
    },
    {
      id: "vencimento",
      Header: () => {
        return (
          <>
            <h5 className="permanente-th">Vencimento</h5>
          </>
        );
      },
      //Header: "Vencimento",
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
      id: "acoes",
      Header: () => {
        return (
          <>
            <h5 className="permanente-th">Ações</h5>
          </>
        );
      },
      //Header: "Ações",
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
