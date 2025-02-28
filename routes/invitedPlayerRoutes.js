const express = require('express');
const auth = require('../middleware/auth');
const invitedPlayerController = require('../controllers/invitedPlayerController');

const router = express.Router();

router.post('/', auth, invitedPlayerController.create);
router.get('/', auth, invitedPlayerController.getAllByOwner);
router.delete('/:id', auth, invitedPlayerController.delete);

module.exports = router;
