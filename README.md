# Auth Service

Este serviço é responsável pelo gerenciamento de autenticação.

## Endpoints

### `GET /`

Retorna uma mensagem de sucesso indicando que o serviço está funcionando.

**Response:**

- `200 OK`: Mensagem de sucesso.

---

### `GET /metrics`

Retorna métricas formatadas para o Prometheus.

**Response:**

- `200 OK`: Métricas do Prometheus.

---

### `POST /login`

Autentica um usuário.

**Request Body:**

```json
{
  "email": "string",
  "senha": "string"
}
```

**Response:**

- `200 OK`: Autenticação realizada com sucesso.

**Requer validação com `loginValidation`.**

## Como executar

1. Certifique-se de que a `docker network` chamada `rede-compartilhada` foi criada:

```bash
docker network create rede-compartilhada
```

2. Suba os containers:

```bash
docker-compose up
```

O serviço estará disponível na porta configurada no `docker-compose.yml`.

