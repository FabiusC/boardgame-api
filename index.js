require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();
const gameRoutes = require('./routes/gameRoutes');
const invitedPlayerRoutes = require('./routes/invitedPlayerRoutes');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/invited-players', invitedPlayerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
