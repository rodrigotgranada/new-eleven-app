import React, { forwardRef, useEffect, useState } from "react";
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
import useGetData from "../../../../hooks/useGetData";
import Loading from "../../../public/Loading/Loading";
import moment from "moment";
import DatePicker, { registerLocale } from "react-datepicker";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { ca } from "date-fns/locale";
import { toast } from "react-toastify";

const ConfirmRenovarPermanente = ({ data, isOpen, setIsOpen }) => {
  const { getDataId: getName, data: name, loading: loadingName } = useGetData();
  const [newParameter, setNewParameter] = useState({ value: "", type: "" });
  useEffect(() => {
    getName("users", data?.nome);
    return () => {};
  }, []);

  const handleCLose = () => {
    setIsOpen(false);
  };

  const weekValue = [
    { number: 0, value: "Domingo" },
    { number: 1, value: "Segunda" },
    { number: 2, value: "Terca" },
    { number: 3, value: "Quarta" },
    { number: 4, value: "Quinta" },
    { number: 5, value: "Sexta" },
    { number: 6, value: "Sabado" },
  ];

  const valuesEdit = [1, 2, 3, 4, 5];
  const valuesTipeEdit = [
    { name: "Semana(s)", value: "w" },
    { name: "Mês(es)", value: "M" },
    { name: "Ano(s)", value: "y" },
  ];

  let newArray = weekValue.filter(function (el) {
    return el.value === data.dia;
  });

  const isWeekday = (date) => {
    const day = date.getDay();
    return day === newArray[0].number;
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="btn btn-primary agenda-button"
      onClick={onClick}
      ref={ref}
    >
      {data.vencimento
        ? moment(data.vencimento).format("DD/MM/YYYY")
        : "Data Inicio"}
    </button>
  ));

  const handleChanges = (e) => {
    const { name, value } = e.target;
    let teste = { ...newParameter };
    teste[`${name}`] = value;
    setNewParameter(teste);
  };

  const handleConfirm = async () => {
    const lastDay = data.vencimento;

    const lastDayNew = moment(data.vencimento)
      .add(
        newParameter.type === "y"
          ? newParameter.value * 52
          : newParameter.value,
        `${newParameter.type === "y" ? "w" : newParameter.type}`
      )
      .format("YYYY-MM-DD");
    try {
      const docRef = doc(db, "permanentes", data.id);
      const teste = await updateDoc(docRef, {
        dataFim: lastDayNew,
      }).then(async (e) => {
        try {
          let dates = [];
          let dates_string = [];
          for (
            let i = moment(lastDay).add(7, "days");
            i.diff(lastDayNew, "days") <= 0;
            i.add(7, "days")
          ) {
            dates.push(i.clone());
            dates_string.push(i.format("YYYY-MM-DD"));
          }
          const result = [];
          dates_string.map(async (date) => {
            try {
              const agendaRef = collection(db, "agenda");
              const body = {
                step: 5,
                user: data?.nome || null,
                dataDia: date || null,
                dataHorario: data?.horario || null,
                esporte: data?.modalidade || null,
                quadra: data?.quadra || null,
                jogadores: [
                  {
                    id: name?.id || null,
                    name: name?.displayName || null,
                    pago: false || null,
                    telefone: name?.telefone || null,
                  },
                ],
                permanente: true || null,
                permanente_id: data?.id || null,
                bloqueio: false,
                bloqueio_id: "",
              };

              await addDoc(agendaRef, body).then((e) => {
                result.push(date);
                console.log("cadastrado", date);
              });

              if (result.length === dates_string.length) {
                toast.success(`Permanente Renovada`, {
                  position: toast.POSITION.TOP_CENTER,
                });
                handleCLose();
              }
            } catch (error) {
              toast.error(`${error}`, {
                position: toast.POSITION.TOP_CENTER,
              });
            }
          });
        } catch (error) {
          toast.error(`${error}`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    } catch (error) {
      toast.error(`${error}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  if (loadingName) return <Loading type={`spin`} width={"30px"} />;

  if (name)
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
              {`Renovar Permanente de ${name?.displayName}`}
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
            <Label for="exampleEmail">Renovar por:</Label>
            <select name={"value"} onChange={handleChanges}>
              <option value={""}>Selecione uma opção</option>
              {valuesEdit.map((valor, index) => {
                return (
                  <option key={index} value={valor}>
                    {valor}
                  </option>
                );
              })}
              {/* <option value="">Selecione</option> */}
            </select>

            {newParameter.value && (
              <>
                <select name={"type"} onChange={handleChanges}>
                  <option value={""}>Selecione uma opção</option>
                  {valuesTipeEdit.map((valor, index) => {
                    return (
                      <option key={index} value={valor.value}>
                        {valor.name}
                      </option>
                    );
                  })}
                </select>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="warning"
              onClick={() => {
                handleConfirm();
              }}
              disabled={newParameter.value === "" || newParameter.type === ""}
            >
              Renovar
            </Button>{" "}
            <Button
              color="secondary"
              onClick={() => {
                handleCLose();
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
};

export default ConfirmRenovarPermanente;
