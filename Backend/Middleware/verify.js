const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.verifyToken = (req, res, next) => {
  // Extract token from request headers, query string, or cookies
  let token = req.headers.authorization?.split(' ')[1].replace(/^"(.*)"$/, '$1'); // Example: Bearer <token>
  // console.log("token : ", token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request object
    // console.log("authorized.");
    next();
  } catch (error) {
    console.log("!!! authorization failed");
    return res.status(401).json({ message: 'Unauthorized' });
  }
};