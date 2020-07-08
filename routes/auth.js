const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const User = require("../models/Users");
const checkToken = require("../middleware/verify");

//@route   GET api/auth
//@desc    Get logged in user
//@access  private

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
});

//@route   POST api/auth
//@desc    Auth user and Get Token
//@access  private

router.post(
  "/",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Enter a password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "User doesnt exists" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credintials" });
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 36000,
        },
        (error, token) => {
          if (error) {
            res.status(500).send("Server Error");
            console.log(error.message);
          }

          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error!");
    }
  }
);

router.post("/__verify_token", checkToken, (req, res, next) => {
  if (res.locals.tokenVerified) {
    res.status(202).json({
      verified: true,
      message: "Token verified",
      token: res.locals.token,
    });
  } else {
    res
      .status(401)
      .json({ verified: false, message: "Token invalid or none existent" });
  }
});

module.exports = router;
