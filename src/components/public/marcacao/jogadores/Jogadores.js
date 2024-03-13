import { useContext, useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import MarcacaoContext from "../../../../contexts/MarcacaoContext";
import "../../../../styles/public/jogadores.scss";
import useGetData from "../../../../hooks/useGetData";
import InputMask from "react-input-mask";
import Teste from "./Teste";

const Jogadores = () => {
  const { marcacao, setMarcacao } = useContext(MarcacaoContext);
  const { getDataId: getUsuario, data: usuario, loadingUsuario } = useGetData();

  useEffect(() => {
    if (marcacao) {
      getUsuario("users", marcacao?.user);
    }
  }, []);

  return (
    <>
      {Object.keys(usuario).length > 0 && (
        <Invited
          usuario={usuario}
          marcacao={marcacao}
          setMarcacao={setMarcacao}
        />
      )}
    </>
  );
};

const Invited = ({ usuario, marcacao, setMarcacao }) => {
  // console.log(usuario, marcacao, setMarcacao);
  const [invitedPlayers, setInvitedPlayers] = useState([
    {
      name: usuario?.displayName,
      telefone: usuario?.telefone,
      id: usuario?.uid ? usuario?.uid : uuidv4(),
      pago: false,
    },
  ]);

  useEffect(() => {
    console.log("invitessss", invitedPlayers);
    let jogadores = { ...marcacao };
    jogadores.step = 4;
    jogadores.jogadores = invitedPlayers;
    setMarcacao(jogadores);
  }, [invitedPlayers]);

  const addMemberRow = () => {
    let _invitedPlayers = [...invitedPlayers];
    _invitedPlayers.push({
      name: "",
      telefone: "",
      id: uuidv4(),
      pago: null,
    });
    setInvitedPlayers(_invitedPlayers);
  };

  const removeMemberRow = (id) => {
    let _invitedPlayers = [...invitedPlayers];
    _invitedPlayers.splice(id, 1);
    setInvitedPlayers(_invitedPlayers);
  };

  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

  const handleChange = (event, indice) => {
    const index = invitedPlayers.findIndex((m) => {
      return m.id === indice;
    });

    let _invitedPlayers = [...invitedPlayers];
    _invitedPlayers[index][event.target.name] =
      event.target.name === "telefone"
        ? onlyNumbers(event.target.value)
        : event.target.value;
    setInvitedPlayers(_invitedPlayers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let jogadores = { ...marcacao };
    jogadores.step = jogadores.step + 1;
    setMarcacao(jogadores);
  };

  return (
    <div className="paginaJogadores">
      <Form onSubmit={handleSubmit}>
        {invitedPlayers &&
          invitedPlayers.map((member, index) => (
            <FormGroup className="form__group" key={index}>
              <Row className="row-jogadores">
                <Col lg="6" md="6" xs="6">
                  <Label>Jogador {index + 1}</Label>
                  <Input
                    key={member.id}
                    type="text"
                    name="name"
                    placeholder={`Nome`}
                    defaultValue={member?.name || ""}
                    onChange={(e) => handleChange(e, member.id)}
                    required={index === 0 ? true : false}
                  />
                </Col>
                <Col lg="6" md="6" xs="6">
                  <Label>Telefone / Whats</Label>
                  <InputMask
                    key={member.id}
                    mask={`(99)99999-9999`}
                    type={"telefone"}
                    name={"telefone"}
                    className={"input-number form-control"}
                    placeholder={"Telefone"}
                    defaultValue={member?.telefone || ""}
                    onChange={(e) => handleChange(e, member.id)}
                    required={index === 0 ? true : false}
                  />
                </Col>
              </Row>
              <Row className="row-buttons-jogador">
                <Col lg="12" className="btn-jog-gap">
                  <button
                    type="button"
                    onClick={addMemberRow}
                    className="btn btn-success"
                  >
                    <BiPlusCircle /> <span className="nameBtn">Adicionar</span>
                  </button>
                  {invitedPlayers.length > 1 && index !== 0 && (
                    <button
                      type="button"
                      onClick={() => removeMemberRow(index)}
                      className="btn btn-danger"
                    >
                      <GiCancel />
                      <span className="nameBtn">Remover</span>
                    </button>
                  )}
                </Col>
              </Row>
            </FormGroup>
          ))}
        <Row className="row-buttons-jogador">
          <Col lg="12" className="row-buttons-jogador">
            <button className="btn btn-success">
              {" "}
              <span>
                {" "}
                <GiConfirmed /> Concluido{" "}
              </span>
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Jogadores;
