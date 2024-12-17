"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const axios = require("axios");
const path = require("path");
const https = require("https");
const url = require("url");
const fs = require("fs");
var _documentCurrentScript = typeof document !== "undefined" ? document.currentScript : null;
const __filename$1 = url.fileURLToPath(typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === "SCRIPT" && _documentCurrentScript.src || new URL("index.cjs", document.baseURI).href);
const __dirname$1 = path.dirname(__filename$1);
const app = express();
app.use(express.static(path.join(__dirname$1, "src")));
const swaggerDocument = YAML.load(path.join(__dirname$1, "swagger.yaml"));
const customCss = fs.readFileSync(path.join(__dirname$1, "./swagger-overrides.css"), "utf8");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));
const agent = new https.Agent({
  rejectUnauthorized: false
});
app.use(express.json());
const redirectToRealEndpoint = async (req, res, url2) => {
  try {
    const response = await axios.post(url2, req.body, {
      headers: {
        "Content-Type": "application/json"
      },
      httpsAgent: agent
      // Ignora erros de certificado SSL
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
};
app.post("/NAI/rest/execJUC", (req, res) => {
  redirectToRealEndpoint(req, res, "https://grcway-qas.myncc.com.br/NAI/rest/execJUC");
});
app.post("/NAI/rest/execJUC/certification", (req, res) => {
  redirectToRealEndpoint(req, res, "https://grcway-qas.myncc.com.br/NAI/rest/execJUC");
});
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/api-docs`);
});
exports.app = app;
