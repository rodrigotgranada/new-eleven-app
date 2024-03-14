import React from "react";
import { useState } from "react";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import MaskedInputCelModal from "./MaskedInputCelModal";
import { BiPlusCircle } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { useEffect } from "react";
import useGetData from "../../../hooks/useGetData";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { toast } from "react-toastify";

const ListPlayers2 = ({ isOpen, agendaID }) => {
  // console.log("marcacao333", dados);
  const [meusJogadores, setMeusJogadores] = useState([]);
  const {
    getDataId: getItemId,
    data: marcX,
    loading: carregaPlayers,
  } = useGetData();

  const handlePlayers = async () => {
    const players = await getItemId("agenda", agendaID);
    setMeusJogadores(players?.jogadores);
    // console.log(players);
  };

  useEffect(() => {
    if (!isOpen) {
      setMeusJogadores(null);
    } else {
      handlePlayers();
    }
  }, [isOpen]);

  // useEffect(() => {
  //   console.log(carregaPlayers);
  // }, [carregaPlayers]);

  const addMemberRow = () => {
    let _meusJogadores = [...meusJogadores];
    if (_meusJogadores[_meusJogadores.length - 1]["name"].length != 0) {
      _meusJogadores.push({
        name: "",
        telefone: "",
        id: uuidv4(),
        pago: null,
      });
      setMeusJogadores(_meusJogadores);
    }
  };

  const removeMemberRow = (id) => {
    let _meusJogadores = [...meusJogadores];
    _meusJogadores.splice(id, 1);
    setMeusJogadores(_meusJogadores);
  };

  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

  const handleChange = (event, indice) => {
    const { value, name } = event.target;
    console.log("value", value, "name", name, "indice", indice);
    const index = meusJogadores.findIndex((m) => {
      console.log(m);
      return m.id === indice;
    });
    const _meusJogadores = [...meusJogadores];
    _meusJogadores[index][name] =
      name != "telefone" ? value : onlyNumbers(value);
    setMeusJogadores(_meusJogadores);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let _meusJogadores = [...meusJogadores];
    console.log("meusJogadores", _meusJogadores);
    if (_meusJogadores[_meusJogadores.length - 1]["name"].length === 0) {
      _meusJogadores.pop();
    }
    try {
      const docRef = doc(db, "agenda", agendaID);
      await updateDoc(docRef, {
        jogadores: _meusJogadores,
      }).then((e) => {
        toast.success("Agendamento atualizado com Sucesso!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form_jogaores_modal">
      {meusJogadores.length > 0 &&
        !carregaPlayers &&
        meusJogadores.map((jogador, index) => (
          <FormGroup className="form__group_modal" key={index}>
            <Row className="rowPlayers">
              <Col lg="6" md="6" sm="6" xs="6" className="modal_col">
                <Input
                  key={jogador.id}
                  type="text"
                  name="name"
                  placeholder={`Nome`}
                  defaultValue={jogador?.name || ""}
                  onChange={(e) => handleChange(e, jogador.id)}
                  required={index === 0 ? true : false}
                />
              </Col>
              <Col lg="6" md="6" sm="6" xs="6" className="modal_col">
                <MaskedInputCelModal
                  unique={jogador.id}
                  type="telefone"
                  name="telefone"
                  placeholder={`Telefone`}
                  defaultValue={jogador?.telefone || ""}
                  handleChange2={handleChange}
                  required={index === 0 ? true : false}
                  classX="form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col className="rowPlayersButtons">
                <button
                  type="button"
                  onClick={addMemberRow}
                  className="btn btn-success btn-modal"
                >
                  <span>
                    <BiPlusCircle />
                  </span>
                </button>
                {meusJogadores.length > 1 && index !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeMemberRow(index)}
                    className="btn btn-danger btn-modal"
                  >
                    <span>
                      <GiCancel />
                    </span>
                  </button>
                )}
              </Col>
            </Row>
          </FormGroup>
        ))}
      <Row className="btn-save-modal">
        <Col className="btn-save-modal">
          <button type="submit" className="btn btn-success ">
            Salvar
          </button>
        </Col>
      </Row>
    </Form>
  );
};

export default ListPlayers2;
