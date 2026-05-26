# 🏦 Banking REST API

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?style=flat-square&logo=spring-boot)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

API REST bancária construída com **Java 17** e **Spring Boot 3.2** para gestão de contas e transações financeiras. Desenvolvida como projeto de portfólio com foco em boas práticas de desenvolvimento empresarial.

---

## ✨ Funcionalidades

- ✅ **CRUD de Contas** — Criação, consulta, atualização e encerramento de contas bancárias
- ✅ **Depósitos & Levantamentos** — Operações financeiras com validação de saldo
- ✅ **Transferências** — Entre contas com transações atómicas
- ✅ **Histórico de Transações** — Paginação e ordenação por data
- ✅ **Validação** — Input validation com Bean Validation
- ✅ **Documentação** — Swagger UI interativo
- ✅ **Testes Unitários** — Cobertura com JUnit 5 + Mockito

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| Linguagem | Java 17 |
| Framework | Spring Boot 3.2 |
| Persistência | Spring Data JPA + Hibernate |
| Base de dados | H2 (dev) / PostgreSQL (prod) |
| Documentação | SpringDoc OpenAPI (Swagger) |
| Testes | JUnit 5, Mockito, AssertJ |
| Build | Maven |

---

## 🚀 Como Executar

### Pré-requisitos
- Java 17+
- Maven 3.8+

### Execução Local

```bash
# Clonar repositório
git clone https://github.com/DasilvaCatarina/banking-api.git
cd banking-api

# Executar com Maven
./mvnw spring-boot:run

# Ou compilar e executar
./mvnw clean package
java -jar target/banking-api-1.0.0.jar
```

A API ficará disponível em `http://localhost:8080`

### Swagger UI
Aceder à documentação interativa: `http://localhost:8080/swagger-ui.html`

### H2 Console (desenvolvimento)
`http://localhost:8080/h2-console` — JDBC URL: `jdbc:h2:mem:bankingdb`

---

## 📋 Endpoints Principais

### Contas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/v1/accounts` | Criar conta |
| `GET` | `/api/v1/accounts` | Listar contas |
| `GET` | `/api/v1/accounts/{id}` | Obter conta por ID |
| `PUT` | `/api/v1/accounts/{id}` | Atualizar conta |
| `DELETE` | `/api/v1/accounts/{id}` | Fechar conta |

### Transações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/v1/accounts/{num}/transactions/deposit` | Depósito |
| `POST` | `/api/v1/accounts/{num}/transactions/withdraw` | Levantamento |
| `POST` | `/api/v1/accounts/{num}/transactions/transfer` | Transferência |
| `GET` | `/api/v1/accounts/{num}/transactions` | Histórico |

### Exemplo de Pedido

```json
// POST /api/v1/accounts
{
  "ownerName": "Catarina Silva",
  "accountType": "CHECKING",
  "initialDeposit": 1000.00
}

// Resposta
{
  "id": 1,
  "accountNumber": "PT1234567890",
  "ownerName": "Catarina Silva",
  "balance": 1000.00,
  "accountType": "CHECKING",
  "status": "ACTIVE",
  "createdAt": "2024-01-15T10:30:00"
}
```

---

## 🏗️ Estrutura do Projeto

```
src/main/java/com/catarina/banking/
├── BankingApiApplication.java
├── controller/
│   ├── AccountController.java
│   └── TransactionController.java
├── service/
│   ├── AccountService.java
│   └── TransactionService.java
├── repository/
│   ├── AccountRepository.java
│   └── TransactionRepository.java
├── model/
│   ├── Account.java
│   └── Transaction.java
└── dto/
    ├── AccountDTO.java
    └── TransactionDTO.java
```

---

## 🧪 Executar Testes

```bash
./mvnw test
```

---

## 📄 Licença

MIT License — consultar [LICENSE](LICENSE) para detalhes.
