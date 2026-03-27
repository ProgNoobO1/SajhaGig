const router = require('express').Router();
const { signup, login, me } = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth');
const validate = require('../middleware/validate');

router.post('/signup', validate(['firstName', 'lastName', 'email', 'password', 'role']), signup);
router.post('/login', validate(['email', 'password']), login);
router.get('/me', auth, me);

module.exports = router;
