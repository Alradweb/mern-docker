const jwt = require("jsonwebtoken")
if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const {JWT_SECRET} = process.env

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next()
  }

  try {

    const token = req.headers.authorization.split(" ")[1] // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: "Нет авторизации" })
    }

    req.user = jwt.verify(token, JWT_SECRET)

    next()

  } catch (e) {
    res.status(401).json({ message: "Нет авторизации" })
  }
}