import useGetData from "./useGetData";
import { createItem } from "../utils/firebase.service";
import useWhatsappApi from "./useWhatsappApi";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import { useAuth } from "../contexts/AuthContext";

const useLogs = () => {
  const { getDataId } = useGetData();
  const { sendWelcome, sendConfirm, sendAgendamento } = useWhatsappApi();
  // const { currentUser } = useAuth();
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
    // console.log("LOGS");
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

  const logAgendamentoDatabase = async (
    local,
    tipo,
    acao,
    dados,
    currentUser
    // usuario,
    // esporte,
    // hora,
    // quadra
  ) => {
    // console.log("LOG", local, tipo, acao, dados);
    // console.log("LOGcurrentUser", currentUser);
    let usuario = {};

    let texto = "";
    if (tipo === "quadra") {
      const quadra = await getDataId("quadras", dados.quadra);
      const horario = await getDataId("horarios", dados.dataHorario);
      const esporte = await getDataId("modalidades", dados.esporte);
      if (dados.user === "avulso") {
        usuario = {
          displayName: dados?.jogadores[0]?.name,
          sobrenome: "",
          telefone: dados?.jogadores[0]?.telefone,
        };
      } else {
        usuario = await getDataId("users", dados.user);
      }

      texto =
        acao === "add"
          ? `${currentUser.usuario.displayName} ${
              currentUser.usuario.sobrenome
            } (${currentUser.usuario.telefone}), marcou a ${quadra?.name} (${
              quadra?.numero
            }) de ${esporte.display} as ${horario.value}:00 do dia ${moment(
              dados.dataDia
            ).format("DD/MM/YYYY")} para ${usuario?.displayName} ${
              usuario?.sobrenome
            } (${usuario?.telefone}), pelo ${
              local === "app" ? "App" : "Sistema interno"
            }, no dia ${moment(new Date()).format("DD/MM/YYYY")} as ${moment(
              new Date()
            ).format("HH:mm:ss")}`
          : `${currentUser.usuario.displayName} ${
              currentUser.usuario.sobrenome
            } (${currentUser.usuario.telefone}), desmarcou a ${quadra?.name} (${
              quadra?.numero
            }) de ${esporte.display} as ${horario.value}:00 do dia ${moment(
              dados.dataDia
            ).format("DD/MM/YYYY")} para ${usuario?.displayName} ${
              usuario?.sobrenome
            } (${usuario?.telefone}), pelo ${
              local === "app" ? "App" : "Sistema interno"
            }, no dia ${moment(new Date()).format("DD/MM/YYYY")} as ${moment(
              new Date()
            ).format("HH:mm:ss")}`;
    }

    if (tipo === "churras") {
      // console.log("CHURRAS");
      let usuarioFinal = {};
      const churrasqueira = await getDataId(
        "churrasqueiras",
        dados.churrasqueira
      );
      let usuarioGet = {};
      if (!dados.user.nome) {
        usuarioGet = await getDataId("users", dados.user);
        // console.log("usuarioGetXXXX", usuarioGet);
        usuarioFinal = {
          nome: usuarioGet?.displayName,
          sobrenome: usuarioGet?.sobrenome,
          telefone: usuarioGet?.telefone,
        };
      } else {
        usuarioFinal = {
          nome: dados.user.nome,
          sobrenome: "",
          telefone: dados.user.telefone,
        };
      }
      // console.log("usuarioFinal", usuarioFinal);
      texto =
        acao === "add"
          ? `${currentUser.usuario.displayName} ${
              currentUser.usuario.sobrenome
            } (${currentUser.usuario.telefone}), marcou a ${
              churrasqueira?.nome
            } (${
              churrasqueira?.numero
            }) no turno: ${dados.dataHorario.toUpperCase()} do dia ${moment(
              dados.dataDia
            ).format("DD/MM/YYYY")} para ${usuarioFinal?.nome} ${
              usuarioFinal?.sobrenome
            } (${usuarioFinal?.telefone}), pelo ${
              local === "app" ? "App" : "Sistema interno"
            }, no dia ${moment(new Date()).format("DD/MM/YYYY")} as ${moment(
              new Date()
            ).format("HH:mm:ss")}`
          : `${currentUser.usuario.displayName} ${
              currentUser.usuario.sobrenome
            } (${currentUser.usuario.telefone}), desmarcou a ${
              churrasqueira?.nome
            } (${
              churrasqueira?.numero
            }) no turno: ${dados.dataHorario.toUpperCase()} do dia ${moment(
              dados.dataDia
            ).format("DD/MM/YYYY")} para ${usuarioFinal?.nome} ${
              usuarioFinal?.sobrenome
            } (${usuarioFinal?.telefone}), pelo ${
              local === "app" ? "App" : "Sistema interno"
            }, no dia ${moment(new Date()).format("DD/MM/YYYY")} as ${moment(
              new Date()
            ).format("HH:mm:ss")}`;
    }

    // console.log("TEXTO", texto);

    const log =
      tipo === "quadra"
        ? {
            createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            codigo: dados.codLocacao,
            dataDia: dados.dataDia,
            usuario: dados.user,
            esporte: dados.esporte,
            hora: dados.dataHorario,
            espaco: dados.quadra,
            acao: acao,
            tipo: tipo,
            texto: texto,
          }
        : {
            createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            codigo: dados.codLocacao,
            dataDia: dados.dataDia,
            usuario: dados.user.nome
              ? `${dados.user.nome}(${dados.user.telefone})`
              : dados.user,
            hora: dados.dataHorario,
            espaco: dados.churrasqueira,
            acao: acao,
            tipo: tipo,
            texto: texto,
          };
    try {
      const docRef = collection(db, "log_agenda");
      await addDoc(docRef, log).then((e) => {
        console.log("Log gravado");
      });
    } catch (error) {
      console.log(`Log não gravado`, error);
    }
  };

  return {
    logUserCreate,
    logUserConfirm,
    logAgedamento,
    logAgendamentoDatabase,
  };
};

export default useLogs;
