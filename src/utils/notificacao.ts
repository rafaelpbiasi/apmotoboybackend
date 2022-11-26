import axios from "axios";

export async function enviarNotificacao(messages) {
    const data = JSON.stringify(messages);
    await axios
      .post("https://exp.host/--/api/v2/push/send", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {})
      .catch((error) => {});
  }