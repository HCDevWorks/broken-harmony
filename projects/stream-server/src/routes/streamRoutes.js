const express = require('express');
const router = express.Router();
const streamController = require('../controllers/streamController');

router.post('/change-video', streamController.changeVideoSource);
router.post('/change-audio', streamController.changeAudioSource);

module.exports = router;