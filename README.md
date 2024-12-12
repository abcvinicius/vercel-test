# Como Rodar o Swagger com o Endpoint Disponível

Esta documentação explica como configurar e executar o Swagger localmente para explorar o endpoint configurado.

## Sobre o Swagger

O Swagger permite visualizar e testar os endpoints disponíveis de forma interativa, proporcionando facilidade na integração e validação das APIs.

---

## Como Rodar o Swagger

### Pré-requisitos

1. **Node.js e npm**: Certifique-se de ter o Node.js instalado.
2. **Docker** (Opcional): Caso queira rodar a aplicação via contêiner.

---

### Passo 1: Clone o Repositório

```bash
git clone https://github.com/nai-it/grcway_docs.git
cd grcway_docs-master
```

---

### Passo 2: Instale as Dependências

```bash
npm install
```

---

### Passo 3: Inicie o Swagger

```bash
npm run dev
```

---

### Passo 5: Testando o Swagger

```bash
Acesse a interface do Swagger pelo navegador no endereço: http://localhost:3000.
Navegue pelos endpoints disponíveis, visualize a documentação detalhada e execute requisições diretamente pela interface.
```