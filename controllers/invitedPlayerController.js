const InvitedPlayer = require('../models/invitedPlayer');

const invitedPlayerController = {
    create: async (req, res) => {
        const { name, color, icon } = req.body;
        const owner_id = req.user.id;
        const newInvitedPlayer = await InvitedPlayer.create(name, color, icon, owner_id);
        res.status(201).json(newInvitedPlayer);
    },

    getAllByOwner: async (req, res) => {
        const owner_id = req.user.id;
        const players = await InvitedPlayer.getAllByOwner(owner_id);
        res.json(players);
    },

    delete: async (req, res) => {
        const { id } = req.params;
        const owner_id = req.user.id;
        const deletedPlayer = await InvitedPlayer.delete(id, owner_id);
        if (!deletedPlayer) return res.status(404).json({ message: 'Player not found' });
        res.json({ message: 'Player deleted' });
    }
};

module.exports = invitedPlayerController;
