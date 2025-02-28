const pool = require('../config/database');

const InvitedPlayer = {
    create: async (name, color, icon, owner_id) => {
        const query = `
      INSERT INTO invited_players (name, color, icon, owner_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
        const values = [name, color, icon, owner_id];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getAllByOwner: async (owner_id) => {
        const query = `SELECT * FROM invited_players WHERE owner_id = $1;`;
        const values = [owner_id];
        const result = await pool.query(query, values);
        return result.rows;
    },

    delete: async (id, owner_id) => {
        const query = `
      DELETE FROM invited_players 
      WHERE id = $1 AND owner_id = $2 
      RETURNING *;
    `;
        const values = [id, owner_id];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
};

module.exports = InvitedPlayer;
