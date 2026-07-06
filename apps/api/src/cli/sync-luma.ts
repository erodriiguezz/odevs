import { runLumaSync } from '../agents/sync-orchestrator.js'
const summary = await runLumaSync()
console.log(JSON.stringify(summary, null, 2))