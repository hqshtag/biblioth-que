const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const { token } = req.body;
  let verified = false;
  if (!token) {
    verified = false;
  } else
    try {
      verified = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      verified = false;
    }
  res.locals.tokenVerified = verified;
  res.locals.token = token;
  next();
};

module.exports = checkToken;
