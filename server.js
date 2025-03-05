const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/database");

const friendshipRoutes = require("./routes/friendshipRoutes");
const gamesRoutes = require("./routes/gamesRoutes");
const invitedPlayersRoutes = require("./routes/invitedPlayersRoutes");
const scoreSheetsRoutes = require("./routes/scoreSheetsRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/friendships", friendshipRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/invited-players", invitedPlayersRoutes);
app.use("/api/score-sheets", scoreSheetsRoutes);
app.use("/api/users", usersRoutes);

sequelize.sync().then(() => {
    console.log("Database synced successfully.");
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
