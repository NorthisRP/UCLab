const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const { Router } = require("express");
const router = Router();

router.post(
  "/login",
  [
    check("email", "Такого email не существует").isEmail(),
    check("password", "Такого пароля не существует").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      //42 minute
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректный формат данных",
        });
      }
      const { email, password } = req.body;
      //auth
      id = 0;
      const token = jwt.sign({ userId: id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: id });
    } catch (error) {
      res.status(500).json({ message: "..." });
    }
  }
);

module.exports = router;
