const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization");
    if (!bearerToken)
      return res.status(401).send("Access denied. No token provided.");
    if (!bearerToken.startsWith("Bearer"))
      return res.status(401).send("Invalid token.");
    const token = bearerToken.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = auth;
