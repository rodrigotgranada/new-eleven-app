import React from "react";
import axios from "axios";

const useWhatsappApi = () => {
  const sendConfirm = (number, code) => {
    console.log(number, code);
    const header = {
      headers: {
        Authorization: `Bearer EAAyOgO7GEEABOyQWVTNbfptFyafurRmEfvrsR8ZCtM5ercGnRdpOZBICIn3hEhR8ZBNqR87P5hRxe4C7FSSdiyI1IieB3Gb3X5s99BeT74v5ZA4n6zjT9jdWanx4akc1a8l4MROZCaQKWaGTJb1aZBE8VJDSrA8RuxoYEAjtvkUBLuZCt6EvO58dmxRbqGHyyCT`,
        Accept: "application/json",
      },
    };
    const body = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: `55${number}`,
      type: "template",
      template: {
        name: "welcomeconfirm",
        language: {
          code: "en_US",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: `${code}`,
              },
            ],
          },
          {
            type: "button",
            sub_type: "url",
            index: "0",
            parameters: [
              {
                type: "text",
                text: `${code}`,
              },
            ],
          },
        ],
      },
    };

    axios
      .post(
        "https://graph.facebook.com/v17.0/119012777970637/messages",
        body,
        header
      )
      .then((res) => console.log("msg enviada", res))
      .catch((err) => console.log("ERRO", err));
  };

  const sendConfirmPT = async (number, code) => {
    console.log(number, code);
    let confirm = false;
    const header = {
      headers: {
        Authorization: `Bearer EAAyOgO7GEEABOyQWVTNbfptFyafurRmEfvrsR8ZCtM5ercGnRdpOZBICIn3hEhR8ZBNqR87P5hRxe4C7FSSdiyI1IieB3Gb3X5s99BeT74v5ZA4n6zjT9jdWanx4akc1a8l4MROZCaQKWaGTJb1aZBE8VJDSrA8RuxoYEAjtvkUBLuZCt6EvO58dmxRbqGHyyCT`,
        Accept: "application/json",
      },
    };
    const body = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: `55${number}`,
      type: "template",
      template: {
        name: "bemvindocode",
        language: {
          code: "pt_BR",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: `${code}`,
              },
            ],
          },
          {
            type: "button",
            sub_type: "url",
            index: "0",
            parameters: [
              {
                type: "text",
                text: `${code}`,
              },
            ],
          },
        ],
      },
    };

    const config = await axios
      .post(
        "https://graph.facebook.com/v17.0/119012777970637/messages",
        body,
        header
      )
      .then((res) => {
        console.log("msg enviada", res);
        return true;
      })
      .catch((err) => {
        console.log("ERRO", err);
        return false;
      });

    return config;
  };

  // const sendConfirm = (number, name, code) => {
  //   console.log(number, name, code);
  //   const header = {
  //     headers: {
  //       Authorization: `Bearer EAAyOgO7GEEABOyQWVTNbfptFyafurRmEfvrsR8ZCtM5ercGnRdpOZBICIn3hEhR8ZBNqR87P5hRxe4C7FSSdiyI1IieB3Gb3X5s99BeT74v5ZA4n6zjT9jdWanx4akc1a8l4MROZCaQKWaGTJb1aZBE8VJDSrA8RuxoYEAjtvkUBLuZCt6EvO58dmxRbqGHyyCT`,
  //       Accept: "application/json",
  //     },
  //   };
  //   const body = {
  //     messaging_product: "whatsapp",
  //     to: `55${number}`,
  //     type: "template",
  //     template: {
  //       name: "welcome",
  //       language: {
  //         code: "en_US",
  //       },
  //       components: [
  //         {
  //           type: "body",
  //           parameters: [
  //             {
  //               type: "text",
  //               text: `${name}`,
  //             },
  //             {
  //               type: "text",
  //               text: `${code}`,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   };

  //   axios
  //     .post(
  //       "https://graph.facebook.com/v17.0/119012777970637/messages",
  //       body,
  //       header
  //     )
  //     .then((res) => console.log("msg enviada", res))
  //     .catch((err) => console.log("ERRO", err));
  // };

  const sendWelcome = (number, name) => {
    const header = {
      headers: {
        Authorization: `Bearer EAAyOgO7GEEABOyQWVTNbfptFyafurRmEfvrsR8ZCtM5ercGnRdpOZBICIn3hEhR8ZBNqR87P5hRxe4C7FSSdiyI1IieB3Gb3X5s99BeT74v5ZA4n6zjT9jdWanx4akc1a8l4MROZCaQKWaGTJb1aZBE8VJDSrA8RuxoYEAjtvkUBLuZCt6EvO58dmxRbqGHyyCT`,
        Accept: "application/json",
      },
    };
    const body = {
      messaging_product: "whatsapp",
      to: `55${number}`,
      type: "template",
      template: {
        name: "welcome2",
        language: {
          code: "en_US",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: `${name}`,
              },
            ],
          },
        ],
      },
    };

    axios
      .post(
        "https://graph.facebook.com/v17.0/119012777970637/messages",
        body,
        header
      )
      .then((res) => {
        console.log("msg enviada", res);
      })
      .catch((err) => console.log("ERRO", err));
  };

  const sendAgendamento = (
    numero,
    nome,
    quadraNumero,
    quadraNome,
    esporte,
    dia,
    hora,
    codigo
  ) => {
    const header = {
      headers: {
        Authorization: `Bearer EAAyOgO7GEEABOyQWVTNbfptFyafurRmEfvrsR8ZCtM5ercGnRdpOZBICIn3hEhR8ZBNqR87P5hRxe4C7FSSdiyI1IieB3Gb3X5s99BeT74v5ZA4n6zjT9jdWanx4akc1a8l4MROZCaQKWaGTJb1aZBE8VJDSrA8RuxoYEAjtvkUBLuZCt6EvO58dmxRbqGHyyCT`,
        Accept: "application/json",
      },
    };
    const body = {
      messaging_product: "whatsapp",
      to: `55${numero}`,
      type: "template",
      template: {
        name: "agendamento",
        language: {
          code: "en_US",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: `${nome}`,
              },
              {
                type: "text",
                text: `${quadraNumero}`,
              },
              {
                type: "text",
                text: `${quadraNome}`,
              },
              {
                type: "text",
                text: `${esporte}`,
              },
              {
                type: "text",
                text: `${dia}`,
              },
              {
                type: "text",
                text: `${hora}`,
              },
              {
                type: "text",
                text: `${codigo}`,
              },
            ],
          },
        ],
      },
    };

    axios
      .post(
        "https://graph.facebook.com/v17.0/119012777970637/messages",
        body,
        header
      )
      .then((res) => console.log("msg enviada", res))
      .catch((err) => console.log("ERRO", err));
  };
  return { sendWelcome, sendConfirm, sendAgendamento, sendConfirmPT };
};

export default useWhatsappApi;
