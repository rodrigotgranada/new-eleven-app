import React from "react";
import { useState } from "react";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import MaskedInputCelModal from "./MaskedInputCelModal";
import { BiPlusCircle } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { useEffect } from "react";

const ListPlayers = ({ dados }) => {
  console.log("marcacao333", dados);
  const [meusJogadores, setMeusJogadores] = useState(dados?.jogadores);

  let testeJogadores = [...dados?.jogadores];
  console.log("testeJogadores", testeJogadores);
  console.log("meusJogadores", meusJogadores);

  const addMemberRow = () => {
    let _testeJogadores = [...testeJogadores];
    _testeJogadores.push({
      name: "",
      telefone: "",
      id: uuidv4(),
      pago: null,
    });
    testeJogadores = _testeJogadores;

    // let _meusJogadores = [...meusJogadores];
    // _meusJogadores.push({
    //   name: "",
    //   telefone: "",
    //   id: uuidv4(),
    //   pago: null,
    // });
    // setMeusJogadores(_meusJogadores);
  };

  const removeMemberRow = (id) => {
    let _testeJogadores = [...testeJogadores];
    _testeJogadores.splice(id, 1);
    testeJogadores = _testeJogadores;

    // let _meusJogadores = [...meusJogadores];
    // _meusJogadores.splice(id, 1);
    // setMeusJogadores(_meusJogadores);
  };

  const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

  const handleChange = (event, indice) => {
    const { value, name } = event.target;
    // const index = meusJogadores.findIndex((m) => {
    //   return m.id === indice;
    // });
    // const _meusJogadores = [...meusJogadores];
    // console.log("_meusJogadores", _meusJogadores);
    // _meusJogadores[index][name] =
    //   name != "telefone" ? value : onlyNumbers(value);
    // setMeusJogadores(_meusJogadores);

    const index = testeJogadores.findIndex((m) => {
      return m.id === indice;
    });

    let _testeJogadores = [...testeJogadores];
    console.log("_testeJogadores", _testeJogadores);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("meusJogadores", meusJogadores);
    console.log("funcionou");
  };

  return (
    <Form onSubmit={handleSubmit} className="form_jogaores_modal">
      {meusJogadores.length > 0 &&
        meusJogadores.map((jogador, index) => (
          <FormGroup className="form__group_modal" key={index}>
            {/* <Row className="modal_row"> */}
            <Col lg="5" className="modal_col">
              {/* <Label>Jogador {index + 1}</Label> */}
              <Input
                key={jogador.id}
                type="text"
                name="name"
                placeholder={`Nome`}
                defaultValue={jogador?.name || ""}
                onChange={(e) => handleChange(e, index)}
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
                // handleChange2={handleChange}
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

export default ListPlayers;
