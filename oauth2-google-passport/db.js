import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./auth.db");

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, provider TEXT, displayName TEXT, image TEXT)");
});

export default db