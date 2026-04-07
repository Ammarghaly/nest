# 🚀 NestJS Tasks API - Production Grade

A robust, enterprise-ready Tasks Management API built with **NestJS**, **TypeORM**, and **PostgreSQL**. This project has been upgraded from a basic boilerplate to a production-grade system with advanced features.

---

## ✨ Key Features

- **🗄️ Database Integration**: Fully integrated with **PostgreSQL** using TypeORM.
- **🆔 UUID Support**: Uses version 4 UUIDs as primary keys for enhanced security and scalability.
- **🛡️ Data Validation**: Automatic request validation using `class-validator` and `ValidationPipe`.
- **🪵 Logging**: Custom `LoggingInterceptor` to track request methods, paths, and execution time.
- **🚨 Error Handling**: Standardized error responses through a global `HttpExceptionFilter`.
- **🐋 Dockerized**: Ready to run with a single command using `docker-compose`.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **NestJS** | Modern Node.js framework |
| **TypeScript** | Static typing for JavaScript |
| **TypeORM** | Object-Relational Mapper (ORM) |
| **PostgreSQL** | Relational database system |
| **Docker** | Containerization |

---

## 🚦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Version 16 or later)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd Nest-Project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Spin up the PostgreSQL database:
   ```bash
   docker-compose up -d
   ```

4. Start the application:
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000`.

---

## 🔗 Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/task` | Create a new task |
| `GET` | `/task` | Get all tasks |
| `GET` | `/task/:id` | Get a specific task by UUID |
| `PATCH` | `/task/:id/status` | Update a task's status |
| `DELETE` | `/task/:id` | Delete a task |

### 🚀 Validation Examples

**Example POST Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, and bread"
}
```

**Standardized Error Response:**
```json
{
  "statusCode": 400,
  "timestamp": "2026-04-07T13:22:21Z",
  "path": "/task",
  "message": [
    "title should not be empty",
    "title must be longer than or equal to 3 characters"
  ]
}
```

---

## 📝 Custom Interceptors & Filters

### Logging Interceptor
Logs every request in the following format:
`[METHOD] /path — Xms`

### Http Exception Filter
Ensures all errors follow a consistent structure:
```json
{
  "statusCode": number,
  "message": string | string[],
  "timestamp": ISO string,
  "path": string
}
```

---

## 📜 License

Distributed under the **UNLICENSED** license. Created as a production-grade upgrade demonstration.
