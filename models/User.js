const pool = require('../config/database');

// User Model
const User = {
    createUser: async (name, password) => {
        const query = `
      INSERT INTO users (name, password)
      VALUES ($1, $2)
      RETURNING id, name;
    `;
        const values = [name, password];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    getUserByName: async (name) => {
        const query = `SELECT * FROM users WHERE name = $1`;
        const values = [name];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
};

module.exports = User;
