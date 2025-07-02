// utils/validateLog.js
export default function validateLog(log) {
  const levels = ["error", "warn", "info", "debug"];

  if (!levels.includes(log.level)) return "Invalid level";
  if (typeof log.message !== "string") return "Invalid message";
  if (typeof log.resourceId !== "string") return "Invalid resourceId";
  if (isNaN(Date.parse(log.timestamp))) return "Invalid timestamp";
  if (typeof log.traceId !== "string") return "Invalid traceId";
  if (typeof log.spanId !== "string") return "Invalid spanId";
  if (typeof log.commit !== "string") return "Invalid commit";
  if (typeof log.metadata !== "object" || Array.isArray(log.metadata))
    return "Invalid metadata";

  return null;
}
