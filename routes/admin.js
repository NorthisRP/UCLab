const Article = require("../models/Article");
const Project = require("../models/Project");
const User = require("../models/User");
const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const router = Router();
const multer = require("multer");
path = require("path");
const fs = require("fs");

var storageArt = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "image/jpeg") cb(null, "assets/images");
    else if (file.mimetype === "application/pdf") cb(null, "assets/articles");
    else cb({ error: "That extension is not supported" });
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var storageProj = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "image/jpeg") cb(null, "assets/images");
    else cb({ error: "That extension is not supported" });
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload_art = multer({ storage: storageArt });
router.post(
  "/create_article",
  upload_art.any(),
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

const upload_proj = multer({ storage: storageProj });
router.post(
  "/create_project",
  upload_proj.any(),
  [
    check("title", "Некорректный заголовок").isLength({ min: 4 }),
    check("description", "Некорректное описание проекта").isLength({ min: 10 }),
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
      const { title, description } = req.body;
      const image = req.files[0];

      if (!image) res.send("Ошибка при загрузке файла");

      // проверим наличие статьи по заголовку в бд
      const one = await Project.findOne({ title });
      if (one) {
        return res.status(400).json({ message: "Такой проект уже существует" });
      }
      const pathImage = path.join(
        __dirname,
        `..\\assets\\images\\${image.originalname}`
      );
      const project = new Project({
        title,
        description,
        pathImage,
      });
      await project.save();
      res.status(200).json({ message: "Проект успешно добавлен" });
    } catch (error) {
      res.status(500).json({ message: `${error}` });
    }
  }
);

const upload_user = multer({ storage: storageProj });
router.post(
  "/create_user",
  upload_user.any(),
  [
    check("FIO", "Некорректный заголовок").isLength({ min: 4 }),
    check("description", "Некорректная характеристика сотрудника").isLength({
      min: 10,
    }),
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
      const { FIO, description, date, publications } = req.body;
      const image = req.files[0];
      if (!image) res.send("Ошибка при загрузке файла");

      // проверим наличие статьи по заголовку в бд
      const one = await User.findOne({ FIO });
      if (one) {
        return res
          .status(400)
          .json({ message: "Такой сотрудник уже существует" });
      }
      const pathImage = path.join(
        __dirname,
        `..\\assets\\images\\${image.originalname}`
      );
      const user = new User({
        FIO,
        description,
        pathImage,
        date,
        publications,
      });
      await user.save();
      res.status(200).json({ message: "Сотрудник успешно добавлен" });
    } catch (error) {
      res.status(500).json({ message: `${error}` });
    }
  }
);

router.post(
  "/delete",
  [
    check("title", "Некорректный заголовок").isLength({ min: 4 }),
    check("object", "Отсутствует тип сущности").exists(),
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
      const { title, object } = req.body;
      switch (object) {
        case "Article":
          const article = await Article.findOne({ title });
          if (article) {
            fs.unlinkSync(article.pathFile);
            fs.unlinkSync(article.pathImage);
            await article.delete();
            res.status(200).json({ message: "Статья успешно удалена" });
          } else {
            res
              .status(400)
              .json({ message: "Статьи с таким заголовком не найдено" });
          }
          break;
        case "Project":
          const project = await Project.findOne({ title });
          if (project) {
            fs.unlinkSync(project.pathImage);
            await project.delete();
            res.status(200).json({ message: "Проект успешно удален" });
          } else {
            res
              .status(400)
              .json({ message: "Проекта с таким названием не найдено" });
          }
          break;
        case "User":
          let FIO = title;
          const user = await User.findOne({ FIO });
          if (user) {
            fs.unlinkSync(user.pathImage);
            await user.delete();
            res.status(200).json({ message: "Юзер успешно удален" });
          } else {
            res
              .status(400)
              .json({ message: "Юзера с таким именем не найдено" });
          }
          break;
      }
      res.status(500).json({ message: "Этого сообщения быть не должно" });
    } catch (error) {
      res.status(500).json({ message: `${error}` });
    }
  }
);

module.exports = router;
