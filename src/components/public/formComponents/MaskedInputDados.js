import React, { useState } from "react";
import InputMask from "react-input-mask";

const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

const MaskedInputDados = ({
  type,
  id,
  placeholder,
  reference,
  defaultValue,
  required,
  // onBlur,
  setError,
  error,
  disabled,
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
    if (id === "telefone" && valor && valor < 11) {
      let verify = { ...error };
      verify[`${id}`] = `Telefone inválido`;
      setError(verify);
    }
    if (id === "documento" && valor && valor < 11) {
      let verify = { ...error };
      verify[`documentoE`] = `CPF inválido`;
      setError(verify);
    }
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
      defaultValue={defaultValue}
      onChange={(e) => handleChange(e, id)}
      required={required}
      onBlur={(e) => handleVerify(e, id)}
      disabled={disabled}
    />
  );
};

export default MaskedInputDados;
