import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"
 
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: {
    requestCert: true,
  },
})

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PostgresAdapter(pool),
    providers: [Google],
});