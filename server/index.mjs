import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node"; // ✅ for lowdb@7
import validateLog from "./utils/validateLog.js";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// Setup LowDB
const file = path.join(__dirname, "logs.json");
const adapter = new JSONFile(file);
const db = new Low(adapter, { logs: [] }); // ✅ Pass default data here

// Ensure logs array exists
await db.read();
db.data ||= { logs: [] };
await db.write();

// POST /logs – Ingest new log
app.post("/logs", async (req, res) => {
  const log = req.body;
  const error = validateLog(log);
  if (error) return res.status(400).json({ error });

  await db.read();
  db.data.logs.push(log);
  await db.write();

  res.status(201).json(log);
});

// GET /logs – Fetch logs with filters
app.get("/logs", async (req, res) => {
  await db.read();
  let logs = [...db.data.logs];

  const {
    level,
    message,
    resourceId,
    timestamp_start,
    timestamp_end,
    traceId,
    spanId,
    commit,
  } = req.query;

  if (level) logs = logs.filter((log) => log.level === level);
  if (message)
    logs = logs.filter((log) =>
      log.message.toLowerCase().includes(message.toLowerCase())
    );
  if (resourceId) logs = logs.filter((log) => log.resourceId === resourceId);
  if (timestamp_start)
    logs = logs.filter(
      (log) => new Date(log.timestamp) >= new Date(timestamp_start)
    );
  if (timestamp_end)
    logs = logs.filter(
      (log) => new Date(log.timestamp) <= new Date(timestamp_end)
    );
  if (traceId) logs = logs.filter((log) => log.traceId === traceId);
  if (spanId) logs = logs.filter((log) => log.spanId === spanId);
  if (commit) logs = logs.filter((log) => log.commit === commit);

  logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  res.status(200).json(logs);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
