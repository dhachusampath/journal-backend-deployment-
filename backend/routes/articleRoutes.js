const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const articleController = require('../controllers/articleController');

const auth = require("../middleware/authMiddleware");

router.post("/", auth, upload.single("image"), articleController.createArticle);
router.get("/", articleController.getArticles);
router.delete("/:id",auth, articleController.deleteArticle);
router.put("/:id", auth, upload.single("image"), articleController.updateArticle);

module.exports = router;
