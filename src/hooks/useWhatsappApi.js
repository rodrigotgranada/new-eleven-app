import React from "react";
import axios from "axios";

const useWhatsappApi = () => {
  const sendConfirm = (number, code) => {
    console.log(number, code);
    const header = {
      headers: {
        Authorization: `Bearer EAAzwZAcSvR1QBO6nLXOjIk5ukUyZAaKNMooUsMehcUfi7H8ZAi9ZBZBdpuaYtLV2Jgs5h7ScZC77anU95hWgQq4eaZByeVH3q40Goq3pRNi7TY8p0SmCpD9eOTH5B6DppUW5ZBWmiiJqIVxRey4fQFWmqAaZC08fl3CvanpLiN3ZBLk2YPboNgRk5055rJqfDEVyd0`,
        Accept: "application/json",
      },
    };
    const body = {
      messaging_product: "whatsapp",
      to: `55${number}`,
      type: "template",
      template: {
        name: "confirm_codigo_acesso",
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
        ],
      },
    };

    const retorno = axios
      .post(
        "https://graph.facebook.com/v18.0/292580983930541/messages",
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

    return retorno;
  };

  const sendConfirmPT = async (number, code) => {
    console.log(number, code);
    let confirm = false;
    const header = {
      headers: {
        Authorization: `Bearer EAAeb79Fkz6oBO9QpcZAwwtkEUZBDJGouDIFcrSCbx0cO4CNEZABsErVc0MaIi480jb1C2IGLOXYIpuK1qM8AqPUWFxWyPbVPBnxFiGDYUWqJ5dnsYjxurl0YH5qyLWUGOglSmvI5hR0IbZCZCsMgyWUXCiPiuqROitZAEhsTlWKVqJQakBo4DbD5GFajiZBdZAtY`,
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
        "https://graph.facebook.com/v18.0/259782567222999/messages",
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

  const sendTransferencia = (numero, codigo) => {
    const header = {
      headers: {
        Authorization: `Bearer EAAzwZAcSvR1QBO6nLXOjIk5ukUyZAaKNMooUsMehcUfi7H8ZAi9ZBZBdpuaYtLV2Jgs5h7ScZC77anU95hWgQq4eaZByeVH3q40Goq3pRNi7TY8p0SmCpD9eOTH5B6DppUW5ZBWmiiJqIVxRey4fQFWmqAaZC08fl3CvanpLiN3ZBLk2YPboNgRk5055rJqfDEVyd0`,
        Accept: "application/json",
      },
    };
    const body = {
      messaging_product: "whatsapp",
      to: `55${numero}`,
      type: "template",
      template: {
        name: "transferencia_quadra",
        language: {
          code: "pt_BR",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: `${codigo}`,
              },
            ],
          },
        ],
      },
    };
    const retorno = axios
      .post(
        "https://graph.facebook.com/v18.0/292580983930541/messages",
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

    return retorno;
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
        Authorization: `Bearer EAAzwZAcSvR1QBO6nLXOjIk5ukUyZAaKNMooUsMehcUfi7H8ZAi9ZBZBdpuaYtLV2Jgs5h7ScZC77anU95hWgQq4eaZByeVH3q40Goq3pRNi7TY8p0SmCpD9eOTH5B6DppUW5ZBWmiiJqIVxRey4fQFWmqAaZC08fl3CvanpLiN3ZBLk2YPboNgRk5055rJqfDEVyd0`,
        Accept: "application/json",
      },
    };
    const body = {
      messaging_product: "whatsapp",
      to: `55${numero}`,
      type: "template",
      template: {
        name: "confirm_marcacao",
        language: {
          code: "pt_BR",
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
                text: `${quadraNome} (${quadraNumero})`,
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
        "https://graph.facebook.com/v18.0/292580983930541/messages",
        body,
        header
      )
      .then((res) => console.log("msg enviada", res))
      .catch((err) => console.log("ERRO", err));
  };

  const sendMessage = (number, name, code) => {
    const codigo = code ? code : "123456";
    console.log(number, name);
    const header = {
      headers: {
        // Authorization: `Bearer EAAeb79Fkz6oBOyZAZBIieLQOJEMfMYT5vnvRvRtTEN8h2Epia7rzwmZA0VHBQp6tj8WFSkZBjDtXNsg5omeqM79ZBUXLzVHcM43n3BbmgNchmAUCpnOMAmgcB6QX35bewx1WnCL8PGsbF1flwjWZAPUXpPOwfB3tOjlTfAEQ3NLB8LXaxqXSJz4umZBt880JDZCp5vFsjykZBI4ZCJOBcIZACcZD`,
        Authorization: `Bearer EAAzwZAcSvR1QBO6nLXOjIk5ukUyZAaKNMooUsMehcUfi7H8ZAi9ZBZBdpuaYtLV2Jgs5h7ScZC77anU95hWgQq4eaZByeVH3q40Goq3pRNi7TY8p0SmCpD9eOTH5B6DppUW5ZBWmiiJqIVxRey4fQFWmqAaZC08fl3CvanpLiN3ZBLk2YPboNgRk5055rJqfDEVyd0`,
        Accept: "application/json",
      },
    };
    const body = {
      messaging_product: "whatsapp",
      to: `55${number}`,
      type: "template",
      template: {
        name: "bemvindo3",
        language: {
          code: "pt_BR",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: `${name}`,
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
        // "https://graph.facebook.com/v18.0/288641980991320/messages",
        "https://graph.facebook.com/v18.0/292580983930541/messages",
        body,
        header
      )
      .then((res) => {
        console.log("msg enviada", res);
      })
      .catch((err) => console.log("ERRO", err));
  };
  return {
    sendTransferencia,
    sendConfirm,
    sendAgendamento,
    sendConfirmPT,
    sendMessage,
  };
};

export default useWhatsappApi;
