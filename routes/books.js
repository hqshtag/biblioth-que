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
  let { title, description, author, pages, year, language } = req.body;
  let userId = res.locals.user.id;
  if (!pages) pages = null;

  let newBook = new Book({
    title,
    description,
    author,
    pages,
    year,
    language,
    addedBy: userId,
  });

  let result = await newBook.save();

  res.json({ msg: "new book created", book: result });
});

router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let userId = res.locals.user.id;

  let book = await Book.findById(id);

  if (book) {
    if (book.addedBy == userId) {
      Book.findByIdAndRemove(id, (err, result) => {
        if (err) next(err);
        else res.json({ msg: "Book deleted" });
      });
    } else res.status(401).json({ msg: "You can't delete this book" });
  } else res.status(404).json({ msg: "book not found" });
});

router.put("/:id", async (req, res, next) => {
  let id = req.params.id;
  let userId = res.locals.user.id;
  let book = await Book.findById(id);

  if (book) {
    if (book.addedBy == userId) {
      let { title, description, author, pages, year, language } = req.body;

      Book.findByIdAndUpdate(
        id,
        {
          $set: {
            title,
            description,
            author,
            pages,
            year,
            language,
            addedBy: userID,
          },
        },
        (err, result) => {
          if (err) next(err);
          else {
            res.json({ msg: "Book updated" });
          }
        }
      );
    } else res.status(401).json({ msg: "You can't update this book" });
  } else res.status(404).json({ msg: "Book not found " });
});

module.exports = router;
