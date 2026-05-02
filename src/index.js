const fs = require("fs");
const { createLogEntry } = require("./schema");

class AuditLogger {
  constructor({ agentId, logFile = "./audit.log.json" }) {
    this.agentId = agentId;
    this.logFile = logFile;
  }

  async wrap({ tool, intent, input, destructive = false, action }) {
    const entry = createLogEntry({
      agentId: this.agentId,
      tool,
      intent,
      input,
      destructive,
    });
    const start = Date.now();
    try {
      const output = await action();
      entry.output = output;
      entry.outcome = "success";
      entry.duration_ms = Date.now() - start;
      this._write(entry);
      return output;
    } catch (err) {
      entry.outcome = "error";
      entry.output = { error: err.message };
      entry.duration_ms = Date.now() - start;
      this._write(entry);
      throw err;
    }
  }

  _write(entry) {
    fs.appendFileSync(this.logFile, JSON.stringify(entry) + "\n");
  }
}

module.exports = { AuditLogger };
