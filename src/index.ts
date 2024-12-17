import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import axios from 'axios';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// Configurações de caminho
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'src')));

// Carrega o arquivo swagger.yaml
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Leia o CSS personalizado
const customCss = fs.readFileSync(path.join(__dirname, './swagger-overrides.css'), 'utf8');

// Configura o Swagger UI com CSS personalizado
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));

// Ignorar SSL inválido
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// Middleware para interpretar JSON
app.use(express.json());

// Função para redirecionar caminhos fictícios para o endpoint real
const redirectToRealEndpoint = async (req: Request, res: Response, url: string) => {
  try {
    const response = await axios.post(url, req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
      httpsAgent: agent, // Ignora erros de certificado SSL
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }
};

// Rota para /NAI/rest/execJUC (padrão)
app.post('/NAI/rest/execJUC', (req: Request, res: Response) => {
  redirectToRealEndpoint(req, res, 'https://grcway-qas.myncc.com.br/NAI/rest/execJUC');
});

// Rota para /NAI/rest/execJUC/certification
app.post('/NAI/rest/execJUC/certification', (req: Request, res: Response) => {
  redirectToRealEndpoint(req, res, 'https://grcway-qas.myncc.com.br/NAI/rest/execJUC');
});

// Inicia o servidor
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/api-docs`);
});

export { app };