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
    databaseUrl: required('DATABASE_URL'),
    syncSecret: required('SYNC_SECRET'),
    nodeEnv: process.env.NODE_ENV ?? 'development',
}