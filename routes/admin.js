const Article = require("../models/Article");
const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const router = Router();
const multer = require("multer");
path = require("path");
const fs = require("fs");
// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "image/jpeg") cb(null, "assets/images");
    else if (file.mimetype === "application/pdf") cb(null, "assets/articles");
    else cb({ error: "That extension is not supported" });
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/create_article",
  upload.any(),
  [
    check("title", "Некорректный заголовок").isLength({ min: 4 }),
    check("description", "Некорректное описание статьи").isLength({ min: 10 }),
    check("date", "Некорректная дата").isDate(),
    check("category", "Некорректная категория").isLength({ min: 3, max: 15 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректный формат данных",
        });
      }
      const { title, description, date, category } = req.body;
      const image = req.files[0];
      const file = req.files[1];

      if (!image || !file) res.send("Ошибка при загрузке файла");

      // проверим наличие статьи по заголовку в бд
      const one = await Article.findOne({ title });
      if (one) {
        return res.status(400).json({ message: "Такая статья уже существует" });
      }
      const pathImage = path.join(
        __dirname,
        `..\\assets\\images\\${image.originalname}`
      );
      const pathFile = path.join(
        __dirname,
        `..\\assets\\articles\\${file.originalname}`
      );
      const article = new Article({
        title,
        description,
        date,
        category,
        pathImage,
        pathFile,
      });
      await article.save();
      res.status(200).json({ message: "Статья успешно добавлена" });
    } catch (error) {
      res.status(500).json({ message: `${error}` });
    }
  }
);

router.post(
  "/delete",
  [check("title", "Некорректный заголовок").isLength({ min: 4 })],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректный формат данных",
        });
      }
      title = req.body;
      const one = await Article.findOne(title);
      if (one) {
        fs.unlinkSync(one.pathFile);
        fs.unlinkSync(one.pathImage);
        one.delete();
        return res.status(200).json({ message: "Статья успешно удалена" });
      }
      res.status(400).json({ message: "Статьи с таким заголовком не найдено" });
    } catch (error) {
      res.status(500).json({ message: `${error}` });
    }
  }
);

module.exports = router;
