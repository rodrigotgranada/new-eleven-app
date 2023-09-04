import { useContext, useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import MarcacaoContext from "../../../../contexts/MarcacaoContext";
import "../../../../styles/public/jogadores.scss";

const Jogadores = () => {
  const { marcacao, setMarcacao } = useContext(MarcacaoContext);

  const [invitedPlayers, setInvitedPlayers] = useState([
    {
      name: marcacao.user.displayName,
      telefone: marcacao.user.telefone,
      id: marcacao.user.uid ? marcacao.user.uid : uuidv4(),
    },
  ]);

  useEffect(() => {
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
    });
    setInvitedPlayers(_invitedPlayers);
  };

  const removeMemberRow = (id) => {
    let _invitedPlayers = [...invitedPlayers];
    _invitedPlayers.splice(id, 1);
    setInvitedPlayers(_invitedPlayers);
  };

  const handleChange = (event, indice) => {
    const index = invitedPlayers.findIndex((m) => {
      return m.id === indice;
    });

    let _invitedPlayers = [...invitedPlayers];
    _invitedPlayers[index][event.target.name] = event.target.value;
    setInvitedPlayers(_invitedPlayers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let jogadores = { ...marcacao };
    jogadores.step = jogadores.step + 1;
    setMarcacao(jogadores);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {invitedPlayers &&
        invitedPlayers.map((member, index) => (
          <FormGroup className="form__group" key={index}>
            <Row>
              <Col lg="6">
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
              <Col lg="6">
                <Label>Telefone / Whats</Label>
                <Input
                  key={member.id}
                  type="number"
                  name="telefone"
                  className="input-number"
                  placeholder={`DDD+Telefone ( 53999110000 )`}
                  defaultValue={member?.telefone || ""}
                  onChange={(e) => handleChange(e, member.id)}
                  required={index === 0 ? true : false}
                />
              </Col>
            </Row>
            <Row className="row-buttons-jogador">
              <Col lg="12">
                <button
                  type="button"
                  onClick={addMemberRow}
                  className="btn btn-success"
                >
                  <span>
                    {" "}
                    <BiPlusCircle /> Adicionar{" "}
                  </span>
                </button>
                {invitedPlayers.length > 1 && index !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeMemberRow(index)}
                    className="btn btn-danger"
                  >
                    <span>
                      <GiCancel />
                      Remover
                    </span>
                  </button>
                )}
              </Col>
            </Row>
          </FormGroup>
        ))}
      <Row>
        <Col lg="12" className="row-button-confirm-jogador">
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
  );
};

export default Jogadores;
