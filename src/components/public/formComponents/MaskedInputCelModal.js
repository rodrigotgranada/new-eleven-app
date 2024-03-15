import React, { useState } from "react";
import InputMask from "react-input-mask";

const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

const MaskedInputCelModal = ({
  unique,
  type,
  name,
  id,
  placeholder,
  reference,
  required,
  classX,
  defaultValue,
  handleChange2,
  setError,
  error,
  desabilitado,
}) => {
  const handleVerify = (event, id) => {
    const valor = onlyNumbers(event.target.value).length;
    if (id === "telefone" && valor && valor < 11) {
      let verify = { ...error };
      verify[`${id}`] = `Telefone inválido`;
      setError(verify);
    }
  };
  return (
    <InputMask
      key={unique}
      mask={`(99)99999-9999`}
      type={type}
      name={name}
      className={classX}
      id={id}
      placeholder={placeholder}
      defaultValue={defaultValue}
      ref={reference}
      onChange={(e) => handleChange2(e, unique)}
      required={required}
      onBlur={(e) => handleVerify(e, id)}
      style={{ width: "100%" }}
      disabled={desabilitado}
    />
  );
};

export default MaskedInputCelModal;
