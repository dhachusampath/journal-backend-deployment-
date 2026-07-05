const Article = require("../models/Article");

exports.createArticle = async (req, res) => {
  try {
    const article = await Article.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      location: req.body.location,
      image: req.file ? req.file.filename : "",
      author: req.user.id,
    });

    const populatedArticle = await Article.findById(article._id).populate(
      "author",
      "name profileImage",
    );
    res.status(201).json(populatedArticle);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("author", "name profileImage")
      .sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this article" });
    }

    await article.deleteOne();

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
    article.title = req.body.title;
    article.content = req.body.content;
    article.category = req.body.category;
    article.location = req.body.location;
    if (req.file) {
      article.image = req.file.filename;
    }
    await article.save();

    const updated = await Article.findById(article._id).populate(
      "author",
      "name profileImage",
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
