import React, { useState, useEffect } from "react";

function BotaoComTempoDeEspera({ mensagem, reenviarCodigo }) {
  const [podeClicar, setPodeClicar] = useState(true);
  const [tempoRestante, setTempoRestante] = useState(0);

  const iniciarContagemRegressiva = () => {
    if (podeClicar) {
      reenviarCodigo();
      setPodeClicar(false);
      setTempoRestante(120);

      const intervalId = setInterval(() => {
        setTempoRestante((prevTempoRestante) => {
          if (prevTempoRestante === 1) {
            clearInterval(intervalId);
            setPodeClicar(true);
            return 0;
          } else {
            return prevTempoRestante - 1;
          }
        });
      }, 1000);
    }
  };

  return (
    <button
      onClick={iniciarContagemRegressiva}
      disabled={!podeClicar}
      className="btn btn-primary w-100 mt-3 btn-resend-code"
    >
      {podeClicar ? `${mensagem}` : `Aguarde ${tempoRestante} segundos`}
    </button>
  );
}

export default BotaoComTempoDeEspera;
