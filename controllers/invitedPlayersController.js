const { InvitedPlayer } = require("../models");

exports.getAllInvitedPlayers = async (req, res) => {
    try {
        const invitedPlayers = await InvitedPlayer.findAll();
        res.json(invitedPlayers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getInvitedPlayerById = async (req, res) => {
    try {
        const invitedPlayer = await InvitedPlayer.findByPk(req.params.id);
        invitedPlayer ? res.json(invitedPlayer) : res.status(404).json({ error: "Invited Player not found" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createInvitedPlayer = async (req, res) => {
    try {
        const invitedPlayer = await InvitedPlayer.create(req.body);
        res.status(201).json(invitedPlayer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateInvitedPlayer = async (req, res) => {
    try {
        await InvitedPlayer.update(req.body, { where: { id: req.params.id } });
        res.json({ message: "Invited Player updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteInvitedPlayer = async (req, res) => {
    try {
        await InvitedPlayer.destroy({ where: { id: req.params.id } });
        res.json({ message: "Invited Player deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
