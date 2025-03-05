const { Friendship } = require("../models");

exports.getAllFriendships = async (req, res) => {
    try {
        const friendships = await Friendship.findAll();
        res.json(friendships);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getFriendshipById = async (req, res) => {
    try {
        const friendship = await Friendship.findByPk(req.params.id);
        friendship ? res.json(friendship) : res.status(404).json({ error: "Friendship not found" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createFriendship = async (req, res) => {
    try {
        const friendship = await Friendship.create(req.body);
        res.status(201).json(friendship);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateFriendship = async (req, res) => {
    try {
        await Friendship.update(req.body, { where: { id: req.params.id } });
        res.json({ message: "Friendship updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteFriendship = async (req, res) => {
    try {
        await Friendship.destroy({ where: { id: req.params.id } });
        res.json({ message: "Friendship deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
