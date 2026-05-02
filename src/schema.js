const createLogEntry = ({ agentId, tool, intent, input, destructive }) => ({
  id: `aal_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
  timestamp: new Date().toISOString(),
  agent_id: agentId,
  tool_name: tool,
  intent: intent || null,
  input: input || {},
  output: null,
  outcome: "pending",
  duration_ms: null,
  destructive: destructive || false,
  flagged: false,
  flag_reason: null,
});

module.exports = { createLogEntry };
