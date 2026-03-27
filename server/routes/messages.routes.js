const router = require('express').Router();
const { listChats, getMessages, createChat, sendMessage, markRead } = require('../controllers/messages.controller');
const { auth } = require('../middleware/auth');

router.get('/', auth, listChats);
router.get('/:id/messages', auth, getMessages);
router.post('/', auth, createChat);
router.post('/:id/messages', auth, sendMessage);
router.put('/:id/read', auth, markRead);

module.exports = router;
