const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: "Access Denied: No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = decoded;
    //console.log(res.locals.user);
    // console.log(res.locals);
    next();
  } catch (error) {
    //console.log(error.message);
    //res.status(401).json({ msg: "Invalid token" });
    next(error);
  }
};
