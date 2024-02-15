import React, { forwardRef, useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import Select from "react-select";
import { Alert } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";

import useGetData from "../../../../hooks/useGetData";
import "../../../../styles/admin/permanentes.scss";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import PermanenteContext from "../../../../contexts/PermanenteContext";
import Loading from "../../../public/Loading/Loading";
import AgendaPermanente from "../form/AgendaPermanente";
registerLocale("ptBR", ptBR);
const AddPermanente = ({ title, isOpen, setIsOpen }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHora, setSelectedHora] = useState(null);
  const [selectedQuadra, setSelectedQuadra] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [error, setError] = useState({
    name: null,
    telefone: null,
    selectedPlayer: null,
  });

  const { getAllUsers: getUsers, data: users, loadingUsers } = useGetData();
  const { permanente, setPermanente } = useContext(PermanenteContext);
  const [permanenteStartDate, setPermanenteStartDate] = useState(new Date());
  const [btnDiabled, setBtnDisabled] = useState(true);
  const {
    getDataOrderBy: getHorarios,
    data: horarios,
    loading: carregaHorarios,
  } = useGetData();

  useEffect(() => {
    console.log("permanenteStartDate", permanenteStartDate);
    return () => {};
  }, [permanenteStartDate]);

  useEffect(() => {
    getUsers("users");
    getHorarios("horarios", "value", "asc");
    return () => {
      setPermanente({
        user: "",
        dataInicio: "",
        dataFim: "",
        diaSemana: "",
        quadra: "",
        hora: "",
        tipoQuadra: "",
        uid: "",
      });
    };
  }, []);
  const handleCLose = () => {
    setIsOpen(false);
  };

  const handleAddPermanente = async () => {
    console.log("salva");
  };

  useEffect(() => {
    permanente.diaSemana &&
    permanente.dataInicio &&
    permanente.hora &&
    permanente.quadra &&
    permanente.tipoQuadra &&
    permanente.user
      ? setBtnDisabled(false)
      : setBtnDisabled(true);
  }, [permanente]);

  const handleChange = async (e) => {
    let usuario = { ...permanente };
    usuario.user = e ? e.id : null;
    setPermanente(usuario);
  };
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      type={"button"}
      className="btn btn-primary agenda-button"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  const semana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const handleDate = (dia) => {
    setSelectedDate(dia);
  };

  const handleHora = (horario) => {
    setSelectedHora(horario?.id);
  };
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        isOpen={isOpen}
        className="responsive-modal"
      >
        <ModalHeader className="d-block justify-content-between w-100">
          <div className="d-flex justify-content-between w-100">
            {title}
            <div>
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleCLose();
                }}
              >
                x
              </span>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <Row>
            {/* <Form onSubmit={handleAddPermanente} className={"selectPermanente"}> */}
            <Col lg="12">
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
                getOptionValue={(option) => option.id}
                onChange={handleChange}
                placeholder={"Selecione um usuário"}
                noOptionsMessage={() => "Usuário não encontrado"}
              />
              {error.selectedPlayer && (
                <Alert variant="danger">{error.selectedPlayer}</Alert>
              )}

              {permanente && permanente.user && (
                <AgendaPermanente
                  selectedQuadra={selectedQuadra}
                  setSelectedQuadra={setSelectedQuadra}
                />
              )}
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            color="primary"
            onClick={() => handleAddPermanente()}
            disabled={btnDiabled}
          >
            Salvar
          </Button>
          <Button type="button" color="danger" onClick={() => handleCLose()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddPermanente;
