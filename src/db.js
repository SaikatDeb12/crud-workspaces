import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.DATABASE_URL;
export const pool = new Pool({ connectionString: uri });
