const Game = require('../models/Game');

const gameController = {
    create: async (req, res) => {
        const { name, image, scoreSheetStructure } = req.body;
        const newGame = await Game.createGame(name, image, scoreSheetStructure);
        res.status(201).json(newGame);
    },

    getAll: async (req, res) => {
        const games = await Game.getAllGames();
        res.json(games);
    },

    getById: async (req, res) => {
        const { id } = req.params;
        const game = await Game.getGameById(id);
        if (!game) return res.status(404).json({ message: 'Game not found' });
        res.json(game);
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { name, image, scoreSheetStructure } = req.body;
        const updatedGame = await Game.updateGame(id, name, image, scoreSheetStructure);
        res.json(updatedGame);
    },

    delete: async (req, res) => {
        const { id } = req.params;
        const deletedGame = await Game.deleteGame(id);
        if (!deletedGame) return res.status(404).json({ message: 'Game not found' });
        res.json({ message: 'Game deleted' });
    }
};

module.exports = gameController;
