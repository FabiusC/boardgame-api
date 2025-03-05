const express = require("express");
const router = express.Router();
const friendshipController = require("../controllers/friendshipController");

router.get("/", friendshipController.getAllFriendships);
router.get("/:id", friendshipController.getFriendshipById);
router.post("/", friendshipController.createFriendship);
router.put("/:id", friendshipController.updateFriendship);
router.delete("/:id", friendshipController.deleteFriendship);

module.exports = router;
