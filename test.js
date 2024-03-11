const MeasureProtocol = require("./src/index"); // Ajuste o caminho conforme necessário

// Configuração inicial do Analytics
const analytics = new MeasureProtocol({
  debug: true,
  measurementId: "G-72ZJHVSPQS",
  apiSecret: "zZLgqJRjQI2jEq_qi9wrkg",
});

// Exemplo de função para enviar um evento de visualização de página
async function sendPageView(clientId, sessionId) {
  // Exemplo de parâmetros para um evento de visualização de página
  const params = {
    page_title: "Homepage",
    page_location: "https://www.example.com",
    page_path: "/",
    engagement_time_msec: 5000, // Tempo de engajamento na página em milissegundos
  };

  // Envio do evento
  try {
    const { clientId, sessionId } = await analytics.fireEvent(
      "page_view",
      params
    );

    // TODO: armazene o client e sessionId para manter o usuário dentro da mesma sessão;
    console.log(clientId, sessionId);
    console.log("Evento de visualização de página enviado com sucesso.");
  } catch (error) {
    console.error("Erro ao enviar evento de visualização de página:", error);
  }
}

const clientId = null;
let sessionId = null;

// Simula o envio de um evento
sendPageView({ clientId, sessionId });
