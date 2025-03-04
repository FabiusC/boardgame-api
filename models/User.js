const pool = require('../config/database');
const bcrypt = require('bcrypt');

const User = {
    // Check if Username Exists
    checkUsername: async (name) => {
        const query = `SELECT * FROM users WHERE name = $1;`;
        const values = [name];
        const result = await pool.query(query, values);
        return result.rows.length > 0;
    },

    // Check if Email Exists
    checkEmail: async (email) => {
        const query = `SELECT * FROM users WHERE email = $1;`;
        const values = [email];
        const result = await pool.query(query, values);
        return result.rows.length > 0;
    },

    // Create New User
    createUser: async (name, email, hashedPassword) => {
        const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email;
    `;
        const values = [name, email, hashedPassword];
        const result = await pool.query(query, values);
        return result.rows[0];
    }
};

module.exports = User;
