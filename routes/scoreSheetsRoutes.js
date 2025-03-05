const express = require("express");
const router = express.Router();
const scoreSheetsController = require("../controllers/scoreSheetsController");

router.get("/", scoreSheetsController.getAllScoreSheets);
router.get("/:id", scoreSheetsController.getScoreSheetById);
router.post("/", scoreSheetsController.createScoreSheet);
router.put("/:id", scoreSheetsController.updateScoreSheet);
router.delete("/:id", scoreSheetsController.deleteScoreSheet);

module.exports = router;
