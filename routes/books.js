const router = require("express").Router();
const { Book } = require("../models/Book");
const Users = require("../models/Users");

const auth = require("../middleware/auth"); //middleware to validate token

router.use(auth);

router.get("/", async (req, res) => {
  let result = await Book.find();

  res.json({
    msg: `${result.length} books loaded`,
    books: result,
  });
});

router.get("/:id", async (req, res) => {
  let result = await Book.findById(req.params.id);

  res.json({
    book: result,
  });
});

router.post("/", async (req, res) => {
  let { title, description, author, pages } = req.body;
  if (!pages) pages = null;

  let newBook = new Book({
    title,
    description,
    author,
    pages,
  });

  let result = await newBook.save();

  res.json({ msg: "new book created", book: result });
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;

  Book.findByIdAndRemove(id, (err, result) => {
    if (err) next(err);
    if (result) res.json({ msg: "book deleted" });
    else res.json({ msg: "no book with that id" });
  });
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  let { title, description, author, pages } = req.body;
  Book.findByIdAndUpdate(
    id,
    { title, description, author, pages },
    (err, result) => {
      if (err) next(err);
      if (result) res.json({ msg: "Book updated" });
      else res.json({ msg: "No book found with that id" });
    }
  );
});

module.exports = router;
