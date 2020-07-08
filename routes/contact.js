const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/Users");
const Contact = require("../models/Contacts");

router.use(auth);

//@route   GET api/contacts
//@desc    get users all contacts
//@access  private

router.get("/", async (req, res) => {
  const user = res.locals.user;
  // console.log(user);
  try {
    const contacts = await Contact.find({ user: user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error!" });
  }
});

//@route   POST api/contacts
//@desc    create new contacts
//@access  private

router.post(
  "/",
  [check("name", "Name is required!").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    const user = res.locals.user;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, phone, type } = req.body;

    try {
      const newContact = new Contact({
        user: user.id,
        name,
        email,
        phone,
        type,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Server Error!" });
    }
  }
);

//@route   PUT api/contacts
//@desc    update user's contacts
//@access  private

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { email, name, phone, type } = req.body;
  await Contact.findByIdAndUpdate(id, { email, name, phone, type });
  res.send("done");
});

//@route   DELETE api/contacts
//@desc    get users all contacts
//@access  private

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    await Contact.deleteOne({ _id: id });
    res.json({ msg: "Contact Deleted" });
  } catch (error) {
    next(error);
  }
});

//clear all contacts
router.delete("/", async (req, res, next) => {
  const user = res.locals.user;
  try {
    await Contact.deleteMany({ user: user.id });
    res.json({ msg: "Contacts Cleared" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
