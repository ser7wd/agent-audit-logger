const { AuditLogger } = require("../src/index");

const logger = new AuditLogger({ agentId: "test-agent" });

async function fakeApiCall() {
  return { status: "ok", data: "some result" };
}

async function run() {
  const result = await logger.wrap({
    tool: "fakeApiCall",
    intent: "Testing the audit logger",
    input: { param: "value" },
    destructive: false,
    action: fakeApiCall,
  });
  console.log("Result:", result);
  console.log("Check audit.log.json");
}

run();
