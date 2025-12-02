import db from "./db.js";

db.prepare(`
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  author TEXT,
  description TEXT,
  added_by INTEGER,
  FOREIGN KEY(added_by) REFERENCES users(id)
)` ).run();

export const getBooks = () => db.prepare("SELECT * FROM books").all();
export const getBookById = (id) => db.prepare("SELECT * FROM books WHERE id = ?").get(id);
export const saveBook = (title, author, description, added_by) => db.prepare("INSERT INTO books (title, author, description, added_by) VALUES (?, ?, ?, ?)").run(title, author, description, added_by);
