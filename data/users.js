
import db from "./db.js";

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT UNIQUE,
    password_hash TEXT
  )
`).run();

export const getUsers = () => db.prepare('SELECT * FROM users').all();

export const getUserById = (id) =>  db.prepare('SELECT * FROM users WHERE id = ?').get(id);

export const getUserByEmail = (email) => db.prepare('SELECT * FROM users WHERE email = ?').get(email);

export const saveUser = (username, email, password_hash) => db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?,?,?)').run(username, email, password_hash);
