const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

module.exports = verifyToken;
