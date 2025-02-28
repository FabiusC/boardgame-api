const pool = require('../config/database');

// Game Model
const Game = {
    createGame: async (name, image, scoreSheetStructure) => {
        const query = `
      INSERT INTO games (name, image, score_sheet_structure)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
        const values = [name, image, scoreSheetStructure];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getAllGames: async () => {
        const query = `SELECT * FROM games;`;
        const result = await pool.query(query);
        return result.rows;
    },

    getGameById: async (id) => {
        const query = `SELECT * FROM games WHERE id = $1;`;
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    updateGame: async (id, name, image, scoreSheetStructure) => {
        const query = `
      UPDATE games 
      SET name = $1, image = $2, score_sheet_structure = $3
      WHERE id = $4
      RETURNING *;
    `;
        const values = [name, image, scoreSheetStructure, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    deleteGame: async (id) => {
        const query = `DELETE FROM games WHERE id = $1 RETURNING *;`;
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
};

module.exports = Game;
