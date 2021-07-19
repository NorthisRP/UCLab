const Article = require("../models/Article");
const Project = require("../models/Project");
const User = require("../models/User");
const { Router } = require("express");
const router = Router();
const fs = require("fs");

router.get("/articles", async (req, res) => {
  try {
    const db_articles = await Article.find();
    let articles = [];
    db_articles.forEach((article, index) => {
      articles[index] = {
        id: article._id,
        title: article.title,
        description: article.description,
        date: article.date,
        category: article.category,
        image: fs.readFileSync(article.pathImage, "base64"),
      };
    });
    res.send(articles);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

router.get("/projects", async (req, res) => {
  try {
    const db_projects = await Project.find();
    let projects = [];
    db_projects.forEach((project, index) => {
      projects[index] = {
        id: project._id,
        title: project.title,
        description: project.description,
        image: fs.readFileSync(project.pathImage, "base64"),
      };
    });
    res.send(projects);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

router.get("/users", async (req, res) => {
  try {
    const db_users = await User.find();
    let users = [];
    db_users.forEach((user, index) => {
      users[index] = {
        id: user._id,
        FIO: user.FIO,
        description: user.description,
        image: fs.readFileSync(user.pathImage, "base64"),
        date: user.date,
        publications: user.publications,
      };
    });
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

router.get("/pdf", async (req, res) => {
  try {
    const id = req.query.id;
    const one = await Article.findOne({ _id: id });
    var file = fs.createReadStream(one.pathFile);
    res.setHeader("Content-Type", "application/pdf");
    file.pipe(res);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
});

module.exports = router;
