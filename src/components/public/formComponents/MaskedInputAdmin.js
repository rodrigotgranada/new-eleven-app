import React, { useState } from "react";
import InputMask from "react-input-mask";

const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

const MaskedInputAdmin = ({
  type,
  id,
  placeholder,
  reference,
  required,
  // onBlur,
  setError,
  error,
}) => {
  const handleChange = (event, id) => {
    const valores = {
      ...event,
      target: {
        ...event.target,
        value: onlyNumbers(event.target.value),
        id: id,
      },
    };
    // onBlur(valores);
    return valores;
  };

  const handleVerify = (event, id) => {
    const valor = onlyNumbers(event.target.value).length;
    console.log("event", valor);
    let verify = { ...error };
    if (id === "telefone" && valor && valor < 11) {
      verify[`${id}`] = `Telefone inválido`;
    }
    if (id === "telefone" && valor && valor === 11) {
      verify[`${id}`] = null;
    }
    if (id === "documento" && valor && valor < 11) {
      verify[`${id}`] = `CPF inválido`;
    }
    if (id === "documento" && valor && valor === 11) {
      verify[`${id}`] = null;
    }
    setError(verify);
  };
  return (
    <InputMask
      mask={
        type === "telefone"
          ? "(99)99999-9999"
          : type === "documento"
          ? "999.999.999-99"
          : ""
      }
      type={type}
      id={id}
      placeholder={placeholder}
      ref={reference}
      onChange={(e) => handleChange(e, id)}
      required={required}
      onBlur={(e) => handleVerify(e, id)}
    />
  );
};

export default MaskedInputAdmin;
