const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    next(new Error("Access denied"));
  }

  const decoded = jwt.verify(token, "bimat");
  req.userId = decoded.user_id;
  next();
}

module.exports = verify;
