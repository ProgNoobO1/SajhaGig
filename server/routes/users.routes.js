const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users.controller');
const { auth, optionalAuth } = require('../middleware/auth');

router.get('/:id', optionalAuth, getUser);
router.put('/:id', auth, updateUser);

module.exports = router;
