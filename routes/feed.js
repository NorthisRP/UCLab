const Article = require("../models/Article");
const { Router } = require("express");
const router = Router();
const fs = require("fs");

router.get("/load_articles", async (req, res) => {
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

router.get("/load_pdf", async (req, res) => {
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
