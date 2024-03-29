import React, { forwardRef, useContext, useEffect, useState } from "react";
import ChurrasqueiraContext from "../../../contexts/ChurrasqueiraContext";
import moment from "moment";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import useGetData from "../../../hooks/useGetData";
import ButtonHorario from "./ButtonHorario";
import EditChurrasqueira from "../modal/EditChurrasqueira";
import ButtonName from "./ButtonName";
registerLocale("ptBR", ptBR);

const ListChurrasqueiras = () => {
  const { churrasqueiraDate, setChurrasqueiraDate } =
    useContext(ChurrasqueiraContext);
  const {
    getDataWhereSimple: getMarcacoes,
    data: marcacoes,
    loading: carregaMarcacoes,
  } = useGetData();

  const {
    getData: getChurrasqueiras,
    data: churrasqueiras,
    loading: carregaChurrasqueiras,
  } = useGetData();
  const [modalEdit, setModalEdit] = useState(false);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="btn btn-primary agenda-button"
      onClick={onClick}
      ref={ref}
    >
      {moment(churrasqueiraDate).format("DD/MM/YYYY")}
    </button>
  ));

  useEffect(() => {
    getChurrasqueiras("churrasqueiras");
    return () => {};
  }, []);

  useEffect(() => {
    getMarcacoes(
      "agenda_churras",
      "dataDia",
      "==",
      moment(churrasqueiraDate).format("YYYY-MM-DD")
    );
  }, [churrasqueiraDate]);

  useEffect(() => {
    console.log("marcacoes", marcacoes);
    console.log("churrasqueiras", churrasqueiras);
  }, [marcacoes, churrasqueiras]);

  const types = [
    { value: "dia", display: "Meio-Dia" },
    { value: "noite", display: "Noite" },
  ];

  const handleModal = (churras) => {
    console.log("churras", churras);

    return (
      <EditChurrasqueira
        isOpen={modalEdit}
        setIsOpen={setModalEdit}
        churrasqueiraX={churras}
      />
    );
  };

  return (
    <>
      <div className="agenda-churras-btn">
        <DatePicker
          // selected={startDate}
          onChange={(date) => setChurrasqueiraDate(date)}
          // filterDate={isWeekday}
          locale="ptBR"
          // minDate={newDateInicio}
          customInput={<ExampleCustomInput />}
          dateFormat="dd/MM/yyyy"
          // inline
          placeholderText="Quando Inicia"
        />
      </div>
      <div className="agenda-churras-main">
        {churrasqueiras &&
          churrasqueiras.length > 0 &&
          churrasqueiras.map((churrasqueira, index) => {
            return (
              <div className="bloco-quadras" key={index}>
                <ButtonName churrasqueira={churrasqueira} />
                {types.map((type, index) => {
                  return (
                    // <button
                    //   key={index}
                    //   type="button"
                    //   className="btn btn-primary"
                    // >
                    //   {type.display}
                    // </button>
                    <ButtonHorario
                      key={index}
                      index={index}
                      type={type}
                      churrasqueira={churrasqueira}
                    />
                  );
                })}
                {/* <ListHorarios dataClick={dia} quadraClick={churrasqueira} type={type} /> */}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ListChurrasqueiras;
