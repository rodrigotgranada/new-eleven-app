import React, { useContext, useEffect } from "react";
import { MdOutlineWhatsapp } from "react-icons/md";
import ReactWhatsapp from "react-whatsapp";
import MarcacaoContext from "../../../../contexts/MarcacaoContext";
import useGetData from "../../../../hooks/useGetData";
import "../../../../styles/public/confirmacao.scss";
import CancelMarcacao from "./Buttons/CancelMarcacao";
import ConfirmMarcacao from "./Buttons/ConfirmMarcacao";
import Loading from "../../Loading/Loading";
import moment from "moment";

const Confirmacao = () => {
  const { marcacao, setMarcacao } = useContext(MarcacaoContext);
  const {
    getDataId: getHorarioEscolhido,
    data: horarioEscolhido,
    loadingHorario,
  } = useGetData();
  const {
    getDataId: getEsporteEscolhido,
    data: esporteEscolhido,
    loadingEsporte,
  } = useGetData();
  const {
    getDataId: getQuadraEscolhida,
    data: quadraEscolhida,
    loadingQuadra,
  } = useGetData();
  const { getDataId: getUsuario, data: usuario, loadingUsuario } = useGetData();

  useEffect(() => {
    let confirm = { ...marcacao };
    confirm.step = 5;
    setMarcacao(confirm);
  }, []);

  useEffect(() => {
    if (
      (marcacao.dataHorario && marcacao.esporte && marcacao.quadra,
      marcacao.user)
    ) {
      getHorarioEscolhido("horarios", marcacao.dataHorario);
      getEsporteEscolhido("modalidades", marcacao.esporte);
      getQuadraEscolhida("quadras", marcacao.quadra);
      getUsuario("users", marcacao.user);
    }
  }, [marcacao]);

  const handleConfirm = async () => {
    console.log(`Confirmar`);
  };

  const handleCancel = async () => {
    console.log(`Cancelar`);
  };

  return (
    <>
      {loadingHorario && loadingEsporte && loadingQuadra && loadingUsuario && (
        <Loading type={`spin`} width={"30px"} />
      )}
      {usuario &&
        marcacao &&
        quadraEscolhida &&
        esporteEscolhido &&
        horarioEscolhido && (
          <>
            <h3 className="confirmacaoQuadraTexto">
              {`${usuario?.displayName}, confirma a marcação da quadra ${
                quadraEscolhida?.name
              }, de ${esporteEscolhido?.display}, no dia ${moment(
                marcacao.dataDia
              ).format("DD/MM/YYYY")} no horário das ${
                horarioEscolhido.value
              }:00 ??`}
            </h3>
            <div className="jogadorConfirm">
              <h4>Jogadores:</h4>

              {marcacao &&
                marcacao?.jogadores.map((jogador, index) => {
                  if (jogador?.name) {
                    return (
                      <div key={index} className="listJogadoresConfirm">
                        <p className="nomeJogIndividual">{jogador?.name}</p>
                        {jogador?.telefone && (
                          <p className="TelJogIndividual">
                            {jogador?.telefone}
                          </p>
                          // <ReactWhatsapp
                          //   number={`55${jogador?.telefone}`}
                          //   message={`Oi ${jogador?.name}, o ${
                          //     usuario?.displayName
                          //   } marcou a quadra ${quadraEscolhida?.name}, de ${
                          //     esporteEscolhido?.display
                          //   }, no dia ${moment(marcacao.dataDia).format(
                          //     "DD/MM/YYYY"
                          //   )} no horário das ${
                          //     horarioEscolhido.value
                          //   }:00 e marcou você.  `}
                          // >
                          //   <MdOutlineWhatsapp /> {jogador?.telefone}
                          // </ReactWhatsapp>
                        )}
                      </div>
                    );
                  }
                })}
            </div>
            <div className="buttons-confirm-diag">
              <ConfirmMarcacao
                marcacao={marcacao}
                setMarcacao={setMarcacao}
                usuario={usuario}
                handleConfirm={handleConfirm}
              />
              <CancelMarcacao
                marcacao={marcacao}
                setMarcacao={setMarcacao}
                handleConfirm={handleCancel}
              />
            </div>
          </>
        )}
    </>
  );
};

export default Confirmacao;
