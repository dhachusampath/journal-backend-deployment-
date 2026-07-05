const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware"); // adjust to your actual auth middleware path
const {
  createJournal,
  getMyJournals,
  updateJournal,
  deleteJournal,
} = require("../controllers/journalController");

router.post("/", auth, createJournal);
router.get("/", auth, getMyJournals);
router.put("/:id", auth, updateJournal);
router.delete("/:id", auth, deleteJournal);

module.exports = router;
