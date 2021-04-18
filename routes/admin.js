const Article = require("../models/Article");
const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const router = Router();

router.post(
  "/article",
  [
    check("title", "Некорректный заголовок").isLength({ min: 4 }),
    check("description", "Некорректное описание статьи").isLength({ min: 10 }),
    check("date", "Некорректная дата").isDate(),
    check("category", "Некорректная категория").isLength({ min: 3, max: 15 }),
  ],
  async (req, res) => {
    console.log(req.body);
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректный формат данных",
        });
      }

      const { title, description, date, category } = req.body;
      // проверим наличие статьи по заголовку в бд
      const one = await Article.findOne({ title });
      if (one) {
        return res.status(400).json({ message: "Такая статья уже существует" });
      }

      const article = new Article({ title, description, date, category });
      //await article.save();
      res.status(200).json({ message: "Статья успешно добавлена" });
    } catch (error) {
      res.status(500).json({ message: "Упс...Что-то пошло не так" });
    }
  }
);

module.exports = router;
