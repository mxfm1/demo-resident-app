import { defineConfig } from 'drizzle-kit'

if(!process.env.DATABASE_URL){
    throw new Error("NO DATABASE URL PROVIDED")
}

export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL
    },
    verbose: true,
    strict: true
})