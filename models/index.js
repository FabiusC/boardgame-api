const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Import models
const User = require("./users")(sequelize, DataTypes);
const Game = require("./games")(sequelize, DataTypes);
const Friendship = require("./friendship")(sequelize, DataTypes);
const InvitedPlayer = require("./invitedPlayers")(sequelize, DataTypes);
const ScoreSheet = require("./scoreSheets")(sequelize, DataTypes);

// Define Relationships
User.hasMany(Friendship, { foreignKey: "user_ID" });
User.hasMany(Friendship, { foreignKey: "friend_ID" });

User.hasMany(ScoreSheet, { foreignKey: "owner_ID" });
Game.hasMany(ScoreSheet, { foreignKey: "game_ID" });

User.hasMany(InvitedPlayer, { foreignKey: "owner_ID" });

// Sync models with database
sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced successfully.");
});

module.exports = { User, Game, Friendship, InvitedPlayer, ScoreSheet };
