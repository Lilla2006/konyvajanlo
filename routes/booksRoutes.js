import { Router } from "express";
import * as Books from "../data/books.js";
import * as Reviews from "../data/reviews.js";
import { auth } from "./usersRoutes.js";

const router = Router();


router.get("/", (req, res) => {
  const books = Books.getBooks();
  res.json(books);
});

router.get("/:id", (req, res) => {
  const bookId = +req.params.id;
  const book = Books.getBookById(bookId);

  if (!book) return res.status(404).json({ message: "Book not found" });

  const reviews = Reviews.getReviewsByBookId(bookId);
  res.json({ ...book, reviews });
});

router.post("/", auth, (req, res) => {
  const { title, author, description } = req.body;
  const userId = req.userId;

  if (!title || !author || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const saved = Books.saveBook(title, author, description, userId);
  const newBook = Books.getBookById(saved.lastInsertRowid);

  res.json(newBook);
});

router.post("/:id/reviews", auth, (req, res) => {
  const bookId = +req.params.id;
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1–5" });
  }

  const book = Books.getBookById(bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  Reviews.saveReview(bookId, req.userId, rating, comment || "");

  res.json({ message: "Review added successfully" });
});

export default router;
