import React from "react";
import { useState } from "react";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
// import MaskedInputCelModal from "./MaskedInputCelModal";
import { BiPlusCircle } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { useEffect } from "react";
// import useGetData from "../../../hooks/useGetData";
import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../../../firebase";
import { toast } from "react-toastify";
import useGetData from "../../../../hooks/useGetData";
import { db } from "../../../../firebase";
import MaskedInputCelModal from "../../../public/formComponents/MaskedInputCelModal";

const AdminListPlayers = ({ isOpen, agendaID }) => {
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
    // console.log("cliquei", );
    let _meusJogadores = [...meusJogadores];
    if (_meusJogadores[_meusJogadores.length - 1]["name"].length != 0) {
      _meusJogadores.push({
        name: "",
        telefone: "",
        id: uuidv4(),
        pago: false,
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
    // console.log("value", value, "name", name, "indice", indice);
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
    // console.log("meusJogadores", _meusJogadores);
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

  const handleCheck = (event, indice) => {
    const { value, name } = event.target;
    const index = meusJogadores.findIndex((m) => {
      // console.log(m);
      return m.id === indice;
    });
    const _meusJogadores = [...meusJogadores];
    _meusJogadores[index][name] = !_meusJogadores[index][name];
    setMeusJogadores(_meusJogadores);
  };

  return (
    <Form onSubmit={handleSubmit} className="form_jogaores_modal">
      {meusJogadores &&
        meusJogadores.length > 0 &&
        !carregaPlayers &&
        meusJogadores.map((jogador, index) => (
          <FormGroup className="form__group_modal" key={index}>
            <Col lg="5" className="modal_col">
              <Input
                type="checkbox"
                name="pago"
                defaultChecked={jogador?.pago || false}
                onChange={(e) => handleCheck(e, jogador.id)}
              />
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
            <Col lg="5" className="modal_col">
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
            <Col className="modal_col col-btn-plus">
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
          </FormGroup>
        ))}
      <Row className="btn-save-modal">
        <button type="submit" className="btn btn-success ">
          Salvar
        </button>
      </Row>
    </Form>
  );
};

export default AdminListPlayers;
