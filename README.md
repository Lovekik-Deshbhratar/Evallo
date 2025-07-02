# 🪵 Log Ingestion and Querying System

A full-stack developer tool that simulates a real-world log monitoring system. This project enables ingestion of structured logs via an API and provides a powerful frontend to filter and query logs. Built with **Node.js, Express, React, Tailwind CSS**, and a **JSON file** as the database using **LowDB**.

---

## 📦 Tech Stack

- **Backend:** Node.js, Express.js, LowDB (file-based JSON storage)
- **Frontend:** React (Vite), Tailwind CSS
- **HTTP Client:** Axios
- **Dev Tools:** CORS, Vite

---

## 📁 Project Structure

```
Evallo/
├── client/            # React frontend
│   └── src/           # React components & pages
├── server/            # Node.js backend
│   ├── utils/         # Schema validator
│   └── logs.json      # File-based "database"
├── README.md          # This file
└── package.json       # For backend
```

---

## 🚀 Installation & Setup

### 📥 Step 1: Clone the Repository

```bash
git clone https://github.com/Lovekik-Deshbhratar/Evallo.git
cd Evallo
```

---

### 📡 Step 2: Backend Setup

```bash
cd server
npm install
```

Create an initial `logs.json` file:

```json
{
  "logs": []
}
```

Start the backend server:

```bash
node index.mjs
```

> Runs on: `http://localhost:5000`

---

### 💻 Step 3: Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

> Runs on: `http://localhost:5173`

---

## 🧠 Design Decisions & Explanations

- **LowDB with JSON file** was used to satisfy the constraint of using a single file as a database, with all filtering and sorting done in memory using native JavaScript (`Array.filter`, `Array.sort`).
- **Express + Vite** allow rapid development and clear separation of frontend/backend.
- **Validation** is done manually using a custom `validateLog` utility function. It ensures schema compliance before persisting data.
- **Filtering logic** is implemented on the server and supports all filter types, including combinations.
- **Color-coded UI** helps distinguish log levels quickly (red = error, yellow = warning, blue = info, grey = debug).
- **No Redux or context** was needed due to the small scale; `useState` and `useEffect` were sufficient.

---

## ✅ Features Implemented

- ✅ Log ingestion via `POST /logs`
- ✅ View logs in reverse-chronological order
- ✅ Filter logs by:
  - 🔍 Full-text message search (case-insensitive)
  - 📛 Log level (`error`, `warn`, `info`, `debug`)
  - 🖥️ Resource ID
  - 📅 Timestamp range
  - 🔗 `traceId`, `spanId`, `commit`
- ✅ Combine multiple filters at once
- ✅ Dynamic frontend filter UI with live update

---

## 📬 API Endpoints

### ➕ POST `/logs`

Add a new log.

#### Request Body:

```json
{
  "level": "error",
  "message": "Database connection failed.",
  "resourceId": "server-1",
  "timestamp": "2025-07-02T12:00:00Z",
  "traceId": "abc-123",
  "spanId": "span-456",
  "commit": "c0ffee",
  "metadata": {
    "parentResourceId": "gateway-1"
  }
}
```

---

### 📥 GET `/logs`

Retrieve logs with optional filters:

#### Query Params:
- `level`
- `message`
- `resourceId`
- `timestamp_start`
- `timestamp_end`
- `traceId`
- `spanId`
- `commit`

#### Example:
```
GET /logs?level=error&message=database&resourceId=server-1&timestamp_start=2025-07-01T00:00:00Z&timestamp_end=2025-07-02T23:59:59Z
```

---

## 🧪 Bonus / Testing

_No tests added yet._ Manual testing can be done using:

- Postman or Thunder Client for `POST` and `GET` requests
- DevTools network tab to debug API calls
- Sample log payloads for various log levels and times

---

## 🧾 Sample Logs

You can POST the following sample logs to populate your database:

```json
{
  "level": "error",
  "message": "Database connection failed.",
  "resourceId": "server-1",
  "timestamp": "2025-07-02T12:00:00Z",
  "traceId": "abc-123",
  "spanId": "span-456",
  "commit": "c0ffee",
  "metadata": { "parentResourceId": "gateway-1" }
}
```

```json
{
  "level": "info",
  "message": "User logged in.",
  "resourceId": "auth-service",
  "timestamp": "2025-07-02T11:45:00Z",
  "traceId": "xyz-789",
  "spanId": "span-321",
  "commit": "abc123",
  "metadata": { "userId": "user-22" }
}
```

```json
{
  "level": "warn",
  "message": "Memory usage high.",
  "resourceId": "server-2",
  "timestamp": "2025-07-02T10:30:00Z",
  "traceId": "def-456",
  "spanId": "span-111",
  "commit": "beefed",
  "metadata": { "threshold": "85%" }
}
```

```json
{
  "level": "debug",
  "message": "Request payload validated.",
  "resourceId": "api-gateway",
  "timestamp": "2025-07-02T09:15:00Z",
  "traceId": "ghi-321",
  "spanId": "span-222",
  "commit": "feeded",
  "metadata": { "endpoint": "/user/update" }
}
```

---

## 🔗 Author

Made with ❤️ by **Lovekik Deshbhratar**

- [GitHub](https://github.com/Lovekik-Deshbhratar)

---

## 📄 License

MIT License – free to use and modify.
