const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.post('/', gameController.create);
router.get('/', gameController.getAll);
router.get('/:id', gameController.getById);
router.put('/:id', gameController.update);
router.delete('/:id', gameController.delete);

module.exports = router;
