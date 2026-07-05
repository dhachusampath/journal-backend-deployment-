const Journal = require("../models/Journal");

exports.createJournal = async (req, res) => {
  try {
    const journal = await Journal.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: "Journal entry not found" });
    }

    if (journal.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await Journal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: "Journal entry not found" });
    }

    if (journal.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await journal.deleteOne();

    res.status(200).json({ message: "Journal entry deleted successfully" 
      
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};