const { ScoreSheet } = require("../models");

exports.getAllScoreSheets = async (req, res) => {
    try {
        const scoreSheets = await ScoreSheet.findAll();
        res.json(scoreSheets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getScoreSheetById = async (req, res) => {
    try {
        const scoreSheet = await ScoreSheet.findByPk(req.params.id);
        scoreSheet ? res.json(scoreSheet) : res.status(404).json({ error: "Score Sheet not found" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createScoreSheet = async (req, res) => {
    try {
        const scoreSheet = await ScoreSheet.create(req.body);
        res.status(201).json(scoreSheet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateScoreSheet = async (req, res) => {
    try {
        await ScoreSheet.update(req.body, { where: { id: req.params.id } });
        res.json({ message: "Score Sheet updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteScoreSheet = async (req, res) => {
    try {
        await ScoreSheet.destroy({ where: { id: req.params.id } });
        res.json({ message: "Score Sheet deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
