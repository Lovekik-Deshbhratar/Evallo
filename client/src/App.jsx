import { useEffect, useState } from "react";

const levelColors = {
  error: "border-l-4 border-red-500 bg-red-50",
  warn: "border-l-4 border-yellow-500 bg-yellow-50",
  info: "border-l-4 border-blue-500 bg-blue-50",
  debug: "border-l-4 border-gray-500 bg-gray-50",
};

export default function App() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    message: "",
    level: "",
    resourceId: "",
    timestamp_start: "",
    timestamp_end: "",
  });

  useEffect(() => {
    const query = new URLSearchParams(
      Object.entries(filters).filter(([_, v]) => v !== "")
    ).toString();
    fetch(`http://localhost:5000/logs?${query}`)
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Filter Bar */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <input
          type="text"
          placeholder="Search message"
          className="border rounded px-3 py-2"
          value={filters.message}
          onChange={(e) => setFilters({ ...filters, message: e.target.value })}
        />
        <select
          className="border rounded px-3 py-2"
          value={filters.level}
          onChange={(e) => setFilters({ ...filters, level: e.target.value })}
        >
          <option value="">All Levels</option>
          <option value="error">Error</option>
          <option value="warn">Warn</option>
          <option value="info">Info</option>
          <option value="debug">Debug</option>
        </select>
        <input
          type="text"
          placeholder="Resource ID"
          className="border rounded px-3 py-2"
          value={filters.resourceId}
          onChange={(e) =>
            setFilters({ ...filters, resourceId: e.target.value })
          }
        />
        <input
          type="datetime-local"
          className="border rounded px-3 py-2"
          value={filters.timestamp_start}
          onChange={(e) =>
            setFilters({ ...filters, timestamp_start: e.target.value })
          }
        />
        <input
          type="datetime-local"
          className="border rounded px-3 py-2"
          value={filters.timestamp_end}
          onChange={(e) =>
            setFilters({ ...filters, timestamp_end: e.target.value })
          }
        />
      </div>

      {/* Log Results */}
      <div className="space-y-4">
        {logs.length === 0 ? (
          <p className="text-gray-500">No logs found.</p>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className={`p-4 rounded shadow bg-white ${
                levelColors[log.level] || ""
              }`}
            >
              <div className="flex justify-between">
                <span className="font-semibold">{log.level.toUpperCase()}</span>
                <span className="text-sm text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="mt-2 text-gray-800">{log.message}</p>
              <div className="mt-2 text-sm text-gray-600">
                <p>Resource ID: {log.resourceId}</p>
                <p>Trace ID: {log.traceId}</p>
                <p>Span ID: {log.spanId}</p>
                <p>Commit: {log.commit}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
