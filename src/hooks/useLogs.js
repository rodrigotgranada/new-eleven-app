import useGetData from "./useGetData";
import { createItem } from "../utils/firebase.service";
import useWhatsappApi from "./useWhatsappApi";

const useLogs = () => {
  const { getDataId } = useGetData();
  const { sendWelcome, sendConfirm, sendAgendamento } = useWhatsappApi();
  const logUserCreate = (local, tipo, usuario) => {
    console.log(local, tipo, usuario);
    if (tipo === "add") {
      const body = { id: "1111" };
      try {
        createItem(`logs/users/`, body);

        sendWelcome(
          usuario?.usuario?.telefone,
          `${usuario?.usuario?.displayName} ${usuario?.usuario?.sobrenome}`
        );
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

  const logUserConfirm = (local, tipo, usuario) => {
    console.log(local, tipo, usuario);
    if (tipo === "add") {
      const body = { id: "1111" };
      try {
        createItem(`logs/users/`, body);

        sendWelcome(
          usuario?.usuario?.telefone,
          `${usuario?.usuario?.displayName} ${usuario?.usuario?.sobrenome}`
        );
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };
  const logAgedamento = async (local, tipo, dados) => {
    if (tipo === "add") {
      const usuario = await getDataId("users", dados.user);
      const horario = await getDataId("horarios", dados.dataHorario);
      const esporte = await getDataId("modalidades", dados.esporte);
      const quadra = await getDataId("quadras", dados.quadra);

      const hora = new Date().getHours();
      const minuto = new Date().getMinutes();

      const body = {
        log: `${usuario.displayName} ${usuario.sobrenome}, documento: ${usuario.documento}, pelo ${local} no dia ${dados.createAt} as ${hora}:${minuto}, marcou a quadra ${quadra.numero} (${quadra.name}) de ${esporte.display} para o dia ${dados.dataDia} no horário das ${horario.value}:00. Código reserva: ${dados.codLocacao}`,
      };

      const newDate = dados.dataDia.replace("/", "-", 2).replace("/", "-", 2);

      try {
        createItem(
          `logs/agenda/${esporte.value}/${quadra.numero}/${newDate}/${horario.value}/${tipo}/`,
          body
        );

        sendAgendamento(
          usuario.telefone,
          `${usuario.displayName} ${usuario.sobrenome}`,
          quadra.numero,
          quadra.name,
          esporte.display,
          dados.dataDia,
          `${horario.value}:00`,
          dados.codLocacao
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  return { logUserCreate, logUserConfirm, logAgedamento };
};

export default useLogs;
