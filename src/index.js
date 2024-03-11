const crypto = require("crypto");

class MeasureProtocol {
  constructor({
    debug = false,
    measurementId,
    apiSecret,
    clientId,
    sessionId,
  }) {
    this.debug = debug;
    this.endpoint = this.debug
      ? "https://www.google-analytics.com/debug/mp/collect"
      : "https://www.google-analytics.com/mp/collect";
    this.measurementId = measurementId;
    this.apiSecret = apiSecret;
    this.defaultEngagementTimeMsec = 100;
    this.sessionExpirationInMin = 30;
    this.clientId = clientId || this.createClientId();
    this.sessionId = this.checkOrCreateSessionId(sessionId);
  }

  checkDefaultParams() {
    if (!measurementId || !apiSecret) {
      throw new Error(
        "É necessário fornecer tanto measurementId quanto apiSecret para utilizar esse pacote."
      );
    }

    if (!measurementId.startsWith("G-")) {
      throw new Error(
        "Seu measurementId parece estar incorreto normalmente o measurement id começa com G-"
      );
    }

    return true;
  }

  createClientId() {
    return crypto.randomUUID();
  }

  checkOrCreateSessionId(sessionId) {
    const currentSessionIdInMs = new Date(sessionId).getTime();
    const currentTimeInMs = Date.now();

    if (
      !sessionId ||
      (currentTimeInMs - currentSessionIdInMs) / 60000 >
        this.sessionExpirationInMin
    ) {
      return currentTimeInMs.toString();
    }

    return sessionId;
  }

  async fireEvent(name, params = {}) {
    params.session_id = await this.sessionId;

    params.engagement_time_msec =
      params.engagement_time_msec || this.defaultEngagementTimeMsec;

    const payload = JSON.stringify({
      client_id: this.clientId,
      events: [{ name, params }],
    });

    return fetch(
      `${this.endpoint}?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`,
      {
        method: "POST",
        body: payload,
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(async (response) => {
        const validation = await response.json();
        if (this.debug) {
          console.log(
            `Evento: ${name} com o seguinte payload ${JSON.stringify(
              payload
            )} e a resposta foi ${JSON.stringify(validation)}`
          );
        }
        return {
          clientId: this.clientId,
          sessionId: this.sessionId,
        };
      })
      .catch((e) => {
        console.error("Falha na requisição do Google Analytics", e);
      });
  }
}

module.exports = MeasureProtocol;
