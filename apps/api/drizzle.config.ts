import { defineConfig } from 'drizzle-kit'
import { config } from './src/config.js'

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './drizzle',
    dialect: 'turso',
    dbCredentials: {
        url: config.tursoDatabaseUrl,
        authToken: config.tursoAuthToken,
    },
})
