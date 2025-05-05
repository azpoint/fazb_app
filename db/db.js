import knex from "knex";
import { development } from "@/db/knexfile";

const db = knex(development);

export default db;
