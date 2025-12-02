
import db from "./db.js";

db.prepare(`
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  book_id INTEGER,
  user_id INTEGER,
  rating INTEGER,
  comment TEXT,
  FOREIGN KEY(book_id) REFERENCES books(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
)` ).run();

export const getReviewsByBookId = (bookId) => db.prepare("SELECT * FROM reviews WHERE book_id = ?").get(bookId);

export const saveReview = (bookId, userId, rating, comment) => db.prepare("INSERT INTO reviews (book_id, user_id, rating, comment) VALUES (?, ?, ?, ?)").run(bookId, userId, rating, comment);
