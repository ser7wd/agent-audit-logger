# Agent Audit Logger

**Know what your AI agent is actually doing — and stop it before it makes a costly mistake.**

AI agents are powerful. They're also unpredictable. They call tools, place orders, send emails, delete files — and most developers have no structured record of what happened, why it happened, or how to stop it from happening again.

Agent Audit Logger is lightweight middleware that wraps any tool call in any agent. Every action gets logged with intent, input, output, outcome, and duration. Destructive operations get flagged before they fire.

Built by someone who ran a live algorithmic trading bot with real money and had no idea what it was actually doing. This is the tool that should have existed.

---

## Install

```bash
npm install agent-audit-logger
```

---

## Usage

```javascript
const { AuditLogger } = require('agent-audit-logger')

const logger = new AuditLogger({ agentId: 'my-agent' })

const result = await logger.wrap({
  tool: 'placeOrder',
  intent: 'Buy YES on FOMC rate hold — triple signal confirmed',
  input: { market: 'FOMC-MAY26', side: 'yes', amount: 50 },
  destructive: true,
  action: () => myApi.placeOrder(...)
})
```

---

## What gets logged

```json
{
  "id": "aal_1777752847144_clxd6f",
  "timestamp": "2026-05-02T20:14:07.144Z",
  "agent_id": "my-agent",
  "tool_name": "placeOrder",
  "intent": "Buy YES on FOMC rate hold — triple signal confirmed",
  "input": { "market": "FOMC-MAY26", "side": "yes", "amount": 50 },
  "output": { "status": "filled", "order_id": "ord_789" },
  "outcome": "success",
  "duration_ms": 312,
  "destructive": true,
  "flagged": false,
  "flag_reason": null
}
```

---

## Why this exists

Generic logging tools tell you _what_ happened. Agent Audit Logger tells you _why_ your agent decided to do it, _how long_ it took, _whether it was dangerous_, and _whether it should have been stopped_.

Every developer building autonomous agents hits the same moment — something unexpected happens and there's no trail. This fixes that.

---

## Hosted Dashboard

Visual log explorer, session timelines, destructive operation alerts, team access — **coming soon.**

Join the waitlist: [agentauditlogger.com](#) _(coming soon)_

---

## Roadmap

- [x] Node.js SDK
- [ ] Python SDK
- [ ] Pre-execution destructive operation blocking
- [ ] Hosted dashboard
- [ ] Slack / webhook alerts
- [ ] Multi-agent session tracking

---

## License

MIT — free forever. Hosted dashboard is paid.
