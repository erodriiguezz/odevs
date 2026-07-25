import { runMeetupSync } from '../agents/sync-orchestrator.js'
const summary = await runMeetupSync()
console.log(JSON.stringify(summary, null, 2))
