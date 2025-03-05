const express = require("express");
const router = express.Router();
const invitedPlayersController = require("../controllers/invitedPlayersController");

router.get("/", invitedPlayersController.getAllInvitedPlayers);
router.get("/:id", invitedPlayersController.getInvitedPlayerById);
router.post("/", invitedPlayersController.createInvitedPlayer);
router.put("/:id", invitedPlayersController.updateInvitedPlayer);
router.delete("/:id", invitedPlayersController.deleteInvitedPlayer);

module.exports = router;
