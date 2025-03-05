const { Game } = require("../models");

exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        game ? res.json(game) : res.status(404).json({ error: "Game not found" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createGame = async (req, res) => {
    try {
        const game = await Game.create(req.body);
        res.status(201).json(game);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateGame = async (req, res) => {
    try {
        await Game.update(req.body, { where: { id: req.params.id } });
        res.json({ message: "Game updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteGame = async (req, res) => {
    try {
        await Game.destroy({ where: { id: req.params.id } });
        res.json({ message: "Game deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
