import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { loadEnvFile } from 'node:process'
import { fileURLToPath } from 'node:url'

const envPath = resolve(dirname(fileURLToPath(import.meta.url)), '../.env')
if (existsSync(envPath)) {
    loadEnvFile(envPath)
}

function required(name: string): string {
    const value = process.env[name]
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`)
    }
    return value
}

export const config = {
    port: Number(process.env.PORT ?? 3001),
    tursoDatabaseUrl: required('TURSO_DATABASE_URL'),
    // Only required for hosted Turso DBs. Local file:/http: URLs (dev) need no token.
    tursoAuthToken: process.env.TURSO_AUTH_TOKEN ?? undefined,
    syncSecret: required('SYNC_SECRET'),
    adminPassword: required('ADMIN_PASSWORD'),
    adminSessionSecret: required('ADMIN_SESSION_SECRET'),
    corsOrigin: required('CORS_ORIGIN'),
    nodeEnv: process.env.NODE_ENV ?? 'development',
}
