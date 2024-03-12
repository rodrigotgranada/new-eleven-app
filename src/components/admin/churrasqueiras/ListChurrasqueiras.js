import React, { forwardRef, useContext, useEffect } from "react";
import ChurrasqueiraContext from "../../../contexts/ChurrasqueiraContext";
import moment from "moment";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import useGetData from "../../../hooks/useGetData";
import ButtonHorario from "./ButtonHorario";
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

  return (
    <>
      <section className="agenda-churras-btn">
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
      </section>
      <section className="agenda-churras-main">
        {churrasqueiras &&
          churrasqueiras.length > 0 &&
          churrasqueiras.map((churrasqueira, index) => {
            return (
              <div className="bloco-quadras" key={index}>
                <span>
                  {churrasqueira.numero} ({churrasqueira.nome}){" "}
                </span>{" "}
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
      </section>
    </>
  );
};

export default ListChurrasqueiras;
